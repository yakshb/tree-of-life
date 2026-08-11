import "server-only";

import type { TaxonMediaAsset } from "@/types/taxonEnrichment";

const INATURALIST_API_BASE_URL = "https://api.inaturalist.org/v1";
const CACHE_SECONDS = 60 * 60 * 24 * 7;

// Curated nodes that do not exist as accepted iNaturalist taxa can point to a
// representative accepted descendant. These are always labeled as
// representative in the UI and never presented as an exact taxon image.
const REPRESENTATIVE_TAXA: Record<string, string> = {
  gorillini: "Gorilla",
};

interface INaturalistTaxon {
  id: number;
  name: string;
  rank?: string;
  preferred_common_name?: string;
  default_photo?: {
    id?: number;
    attribution?: string;
    license_code?: string;
    medium_url?: string;
    original_url?: string;
    url?: string;
  };
}

interface INaturalistTaxaResponse {
  results?: INaturalistTaxon[];
}

interface INaturalistSpeciesCountResponse {
  results?: Array<{
    taxon?: INaturalistTaxon;
  }>;
}

export interface INaturalistEnrichment {
  media: TaxonMediaAsset[];
  commonNames: string[];
  source?: { name: string; url: string };
}

async function fetchINaturalistJson<T>(path: string, signal?: AbortSignal) {
  const response = await fetch(`${INATURALIST_API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal,
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`iNaturalist request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function findExactTaxon(query: string, signal?: AbortSignal) {
  const data = await fetchINaturalistJson<INaturalistTaxaResponse>(
    `/taxa?q=${encodeURIComponent(query)}&per_page=10`,
    signal,
  );

  return data.results?.find(
    (taxon) => taxon.name.toLowerCase() === query.toLowerCase(),
  );
}

async function findRepresentativeDescendant(
  taxonId: number,
  signal?: AbortSignal,
) {
  const data = await fetchINaturalistJson<INaturalistSpeciesCountResponse>(
    `/observations/species_counts?taxon_id=${taxonId}&rank=species&photos=true&per_page=5`,
    signal,
  );

  return data.results?.find((result) => result.taxon?.default_photo)?.taxon;
}

function toMedia(
  taxon: INaturalistTaxon,
  representation: "exact" | "representative",
): TaxonMediaAsset[] {
  const photo = taxon.default_photo;
  const imageUrl = photo?.medium_url ?? photo?.original_url ?? photo?.url;
  if (!imageUrl?.startsWith("https://")) return [];

  return [
    {
      id: `inaturalist-${photo?.id ?? taxon.id}`,
      type: "image",
      url: imageUrl,
      title: taxon.preferred_common_name ?? taxon.name,
      creator: photo?.attribution,
      license: photo?.license_code,
      source: "iNaturalist",
      sourceUrl: `https://www.inaturalist.org/taxa/${taxon.id}`,
      scientificReference: true,
      representation,
      representedTaxon: taxon.preferred_common_name ?? taxon.name,
    },
  ];
}

export async function getINaturalistEnrichment(
  scientificName: string,
  signal?: AbortSignal,
): Promise<INaturalistEnrichment> {
  const exactTaxon = await findExactTaxon(scientificName, signal);
  const representativeQuery = REPRESENTATIVE_TAXA[scientificName.toLowerCase()];

  const representativeTaxon = exactTaxon
    ? exactTaxon.default_photo
      ? undefined
      : await findRepresentativeDescendant(exactTaxon.id, signal)
    : representativeQuery
      ? await findExactTaxon(representativeQuery, signal)
      : undefined;

  const mediaTaxon = exactTaxon?.default_photo ? exactTaxon : representativeTaxon;
  const sourceTaxon = exactTaxon ?? representativeTaxon;
  if (!sourceTaxon) return { media: [], commonNames: [] };

  return {
    media: mediaTaxon
      ? toMedia(
          mediaTaxon,
          mediaTaxon.id === exactTaxon?.id ? "exact" : "representative",
        )
      : [],
    commonNames: sourceTaxon.preferred_common_name
      ? [sourceTaxon.preferred_common_name]
      : [],
    source: {
      name: "iNaturalist taxon",
      url: `https://www.inaturalist.org/taxa/${sourceTaxon.id}`,
    },
  };
}
