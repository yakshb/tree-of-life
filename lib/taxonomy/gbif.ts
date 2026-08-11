import "server-only";

import type {
  TaxonEnrichment,
  TaxonLineageItem,
  TaxonMediaAsset,
} from "@/types/taxonEnrichment";
import { getINaturalistEnrichment } from "./inaturalist";

const GBIF_API_BASE_URL = "https://api.gbif.org/v1";
const CACHE_SECONDS = 60 * 60 * 24 * 7;

interface GbifMatch {
  usageKey?: number;
  scientificName?: string;
  canonicalName?: string;
  rank?: string;
  status?: string;
  confidence?: number;
  matchType?: string;
  kingdom?: string;
  kingdomKey?: number;
  phylum?: string;
  phylumKey?: number;
  class?: string;
  classKey?: number;
  order?: string;
  orderKey?: number;
  family?: string;
  familyKey?: number;
  genus?: string;
  genusKey?: number;
  species?: string;
  speciesKey?: number;
}

interface GbifPagedResponse<T> {
  results?: T[];
}

interface GbifMedia {
  identifier?: string;
  references?: string;
  title?: string;
  creator?: string;
  license?: string;
  type?: string;
}

interface GbifVernacularName {
  vernacularName?: string;
  language?: string;
}

interface GbifNameUsage {
  key?: number;
  scientificName?: string;
  canonicalName?: string;
  rank?: string;
  taxonomicStatus?: string;
  status?: string;
}

interface GbifOccurrence {
  key?: number;
  license?: string;
  references?: string;
  media?: GbifMedia[];
}

async function fetchGbifJson<T>(path: string, signal?: AbortSignal) {
  const response = await fetch(`${GBIF_API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal,
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GBIF request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

function getLineage(match: GbifMatch): TaxonLineageItem[] {
  const ranks = [
    ["kingdom", match.kingdom, match.kingdomKey],
    ["phylum", match.phylum, match.phylumKey],
    ["class", match.class, match.classKey],
    ["order", match.order, match.orderKey],
    ["family", match.family, match.familyKey],
    ["genus", match.genus, match.genusKey],
    ["species", match.species, match.speciesKey],
  ] as const;

  return ranks.flatMap(([rank, name, key]) =>
    name ? [{ rank, name, ...(key ? { key } : {}) }] : [],
  );
}

function normalizeMedia(key: number, items: GbifMedia[]): TaxonMediaAsset[] {
  const seen = new Set<string>();

  return items.flatMap((item, index) => {
    const url = item.identifier;
    if (!url || !url.startsWith("https://") || seen.has(url)) return [];
    seen.add(url);

    return [
      {
        id: `gbif-${key}-${index}`,
        type:
          item.type?.toLowerCase().includes("drawing") ||
          item.type?.toLowerCase().includes("illustration")
            ? "illustration"
            : "photograph",
        url,
        title: item.title,
        creator: item.creator,
        license: item.license,
        source: "GBIF",
        sourceUrl:
          item.references ?? `https://www.gbif.org/species/${key}`,
        scientificReference: true,
      } satisfies TaxonMediaAsset,
    ];
  });
}

function normalizeOccurrenceMedia(
  taxonKey: number,
  occurrences: GbifOccurrence[],
) {
  return normalizeMedia(
    taxonKey,
    occurrences.flatMap((occurrence) =>
      (occurrence.media ?? []).map((media) => ({
        ...media,
        license: media.license ?? occurrence.license,
        references:
          media.references ??
          occurrence.references ??
          (occurrence.key
            ? `https://www.gbif.org/occurrence/${occurrence.key}`
            : undefined),
      })),
    ),
  );
}

function normalizeVernacularNames(items: GbifVernacularName[]) {
  const names = items
    .filter((item) => !item.language || item.language.toLowerCase().startsWith("en"))
    .flatMap((item) => (item.vernacularName ? [item.vernacularName] : []));

  return [...new Set(names)].slice(0, 8);
}

export async function getGbifTaxonEnrichment({
  name,
  scientificName,
  signal,
}: {
  name: string;
  scientificName?: string;
  signal?: AbortSignal;
}): Promise<TaxonEnrichment> {
  const query = scientificName || name;
  const match = await fetchGbifJson<GbifMatch>(
    `/species/match?name=${encodeURIComponent(query)}`,
    signal,
  );

  if (!match.usageKey || !match.scientificName) {
    const inaturalist = await getINaturalistEnrichment(query, signal).catch(
      () => ({ media: [], commonNames: [], source: undefined }),
    );

    return {
      query,
      match: null,
      lineage: [],
      vernacularNames: inaturalist.commonNames,
      directChildren: [],
      media: inaturalist.media,
      sources: inaturalist.source ? [inaturalist.source] : [],
      warnings: [
        "GBIF could not confidently reconcile this name; iNaturalist was checked independently.",
      ],
    };
  }

  const [mediaResult, occurrenceResult, vernacularResult, childrenResult, inaturalistResult] = await Promise.allSettled([
    fetchGbifJson<GbifPagedResponse<GbifMedia>>(
      `/species/${match.usageKey}/media?limit=12`,
      signal,
    ),
    fetchGbifJson<GbifPagedResponse<GbifOccurrence>>(
      `/occurrence/search?taxonKey=${match.usageKey}&mediaType=StillImage&occurrenceStatus=PRESENT&limit=20`,
      signal,
    ),
    fetchGbifJson<GbifPagedResponse<GbifVernacularName>>(
      `/species/${match.usageKey}/vernacularNames?limit=30`,
      signal,
    ),
    fetchGbifJson<GbifPagedResponse<GbifNameUsage>>(
      `/species/${match.usageKey}/children?limit=24`,
      signal,
    ),
    getINaturalistEnrichment(match.canonicalName ?? match.scientificName, signal),
  ]);

  const warnings: string[] = [];
  if (mediaResult.status === "rejected") warnings.push("GBIF media was unavailable.");
  if (occurrenceResult.status === "rejected") {
    warnings.push("GBIF occurrence imagery was unavailable.");
  }
  if (vernacularResult.status === "rejected") {
    warnings.push("GBIF common names were unavailable.");
  }
  if (inaturalistResult.status === "rejected") {
    warnings.push("iNaturalist media was unavailable.");
  }
  if (childrenResult.status === "rejected") {
    warnings.push("GBIF descendant taxa were unavailable.");
  }

  const inaturalist =
    inaturalistResult.status === "fulfilled"
      ? inaturalistResult.value
      : { media: [], commonNames: [] };

  return {
    query,
    match: {
      key: match.usageKey,
      scientificName: match.scientificName,
      canonicalName: match.canonicalName,
      rank: match.rank,
      taxonomicStatus: match.status,
      confidence: match.confidence,
      matchType: match.matchType,
    },
    lineage: getLineage(match),
    vernacularNames:
      vernacularResult.status === "fulfilled"
        ? [
            ...new Set([
              ...inaturalist.commonNames,
              ...normalizeVernacularNames(vernacularResult.value.results ?? []),
            ]),
          ].slice(0, 8)
        : inaturalist.commonNames,
    directChildren:
      childrenResult.status === "fulfilled"
        ? (childrenResult.value.results ?? []).flatMap((child) =>
            child.key && child.scientificName
              ? [
                  {
                    key: child.key,
                    scientificName: child.scientificName,
                    canonicalName: child.canonicalName,
                    rank: child.rank,
                    taxonomicStatus: child.taxonomicStatus ?? child.status,
                  },
                ]
              : [],
          )
        : [],
    media: [
      ...inaturalist.media,
      ...(mediaResult.status === "fulfilled"
        ? normalizeMedia(match.usageKey, mediaResult.value.results ?? [])
        : []),
      ...(occurrenceResult.status === "fulfilled"
        ? normalizeOccurrenceMedia(
            match.usageKey,
            occurrenceResult.value.results ?? [],
          )
        : []),
    ].slice(0, 6),
    sources: [
      {
        name: "GBIF Backbone Taxonomy",
        url: `https://www.gbif.org/species/${match.usageKey}`,
      },
      ...(inaturalist.source ? [inaturalist.source] : []),
    ],
    warnings,
  };
}
