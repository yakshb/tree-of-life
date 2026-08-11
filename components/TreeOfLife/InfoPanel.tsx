"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Clock3,
  Dna,
  ExternalLink,
  GitFork,
  ImageIcon,
  Leaf,
  Map,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TaxonEnrichment } from "@/types/taxonEnrichment";
import type { TreeNodeData } from "@/types/treeTypes";

interface InfoPanelProps {
  node: TreeNodeData;
}

const taxonomyFields = [
  ["Domain", "domain"],
  ["Realm", "realm"],
  ["Kingdom", "kingdom"],
  ["Clade", "clade"],
  ["Phylum", "phylum"],
  ["Subphylum", "subphylum"],
  ["Class", "class"],
  ["Infraclass", "infraclass"],
  ["Superorder", "superorder"],
  ["Order", "order"],
  ["Suborder", "suborder"],
  ["Infraorder", "infraorder"],
  ["Parvorder", "parvorder"],
  ["Superfamily", "superfamily"],
  ["Family", "family"],
  ["Subfamily", "subfamily"],
  ["Tribe", "tribe"],
  ["Genus", "genus"],
  ["Species", "species"],
] as const;

export default function InfoPanel({ node }: InfoPanelProps) {
  const [enrichment, setEnrichment] = useState<TaxonEnrichment | null>(null);
  const [isEnrichmentLoading, setIsEnrichmentLoading] = useState(
    node.metadata.branchType === "biological",
  );
  const [enrichmentError, setEnrichmentError] = useState<string | null>(null);

  useEffect(() => {
    if (node.metadata.branchType !== "biological") return;

    const controller = new AbortController();
    const params = new URLSearchParams({ name: node.name });
    if (node.attributes?.scientificName) {
      params.set("scientificName", node.attributes.scientificName);
    }

    fetch(`/api/taxa?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        const body = (await response.json()) as TaxonEnrichment & { error?: string };
        if (!response.ok) {
          throw new Error(body.error || "Could not load authoritative taxon data.");
        }
        setEnrichment(body);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setEnrichmentError(
          error instanceof Error
            ? error.message
            : "Could not load authoritative taxon data.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsEnrichmentLoading(false);
      });

    return () => controller.abort();
  }, [node]);

  const taxonomy = taxonomyFields.flatMap(([label, key]) => {
    const value = node.attributes?.[key];
    return value && value.toLowerCase() !== "n/a" ? [{ label, value }] : [];
  });
  const inferredRank = node.metadata.rank;
  const isBroadTaxon = !["genus", "species"].includes(inferredRank);
  const activeImage = enrichment?.media[0] ?? null;
  const isRepresentativeImage =
    isBroadTaxon || activeImage?.representation === "representative";

  const facts = [
    {
      label: "Time range",
      value: node.attributes?.age ?? "Not specified",
      icon: Clock3,
    },
    {
      label: "Geological period",
      value: node.attributes?.geologicalAge ?? "Not specified",
      icon: CalendarDays,
    },
    {
      label: "Curated branches",
      value: `${node.children?.length ?? 0}`,
      icon: GitFork,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 pb-5"
    >
      <section className="overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3.5 py-2.5">
          <div className="flex min-w-0 items-center gap-2 text-xs font-bold">
            <ImageIcon className="h-4 w-4 text-primary" />
            Visual reference
          </div>
          {activeImage?.representation && (
            <Badge
              variant="outline"
              className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
            >
              {activeImage.representation === "exact"
                ? "Exact taxon"
                : "Representative"}
            </Badge>
          )}
        </div>

        {isEnrichmentLoading ? (
          <div className="aspect-[16/9] animate-pulse bg-muted/60" />
        ) : activeImage ? (
          <figure>
            {/* External biodiversity media varies by provider, so a native image keeps the source URL intact. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.url}
              alt={`${isBroadTaxon ? "Representative " : ""}${node.name} ${activeImage.type}`}
              className="aspect-[16/9] w-full bg-muted/20 object-contain"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <figcaption className="flex items-start justify-between gap-3 px-3.5 py-2.5 text-[11px] leading-4 text-muted-foreground">
              <div>
                <span className="font-bold text-foreground">
                  {isRepresentativeImage
                    ? "Representative sourced visual"
                    : "Sourced visual"}
                </span>
                <span className="ml-1.5">
                  {activeImage.representation === "representative" &&
                  activeImage.representedTaxon
                    ? `Shows ${activeImage.representedTaxon} · `
                    : ""}
                  {[activeImage.creator, activeImage.license]
                    .filter(Boolean)
                    .join(" · ") || "Attribution supplied by the source"}
                </span>
              </div>
              {activeImage.sourceUrl && (
                <a
                  href={activeImage.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex shrink-0 items-center gap-1 text-primary hover:underline"
                >
                  {activeImage.source}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </figcaption>
          </figure>
        ) : (
          <div className="flex min-h-32 flex-col items-center justify-center px-5 py-8 text-center">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <p className="mt-2 text-xs font-bold">No sourced visual found</p>
            <p className="mt-1 max-w-xs text-[11px] leading-4 text-muted-foreground">
              No exact taxon image or attributable representative was found in
              iNaturalist or GBIF.
            </p>
          </div>
        )}

        {enrichmentError && (
          <p className="flex items-start gap-2 border-t border-border/60 px-3.5 py-2.5 text-xs text-amber-700 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {enrichmentError}
          </p>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
          <Leaf className="h-4 w-4" />
          At a glance
        </div>
        <p className="text-sm leading-6 text-foreground/80">
          {node.attributes?.description ??
            "This branch does not have a written description yet. Ask the AI guide for a contextual overview."}
        </p>
      </section>

      {enrichment && enrichment.directChildren.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <GitFork className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Live catalogue branches</h3>
          </div>
          <p className="mb-3 text-xs leading-5 text-muted-foreground">
            Direct descendants returned by GBIF extend beyond the curated map.
          </p>
          <div className="flex flex-wrap gap-2">
            {enrichment.directChildren.slice(0, 10).map((child) => (
              <a
                key={child.key}
                href={`https://www.gbif.org/species/${child.key}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border/70 bg-muted/30 px-2.5 py-1 text-xs transition-colors hover:border-primary/40 hover:text-primary"
              >
                {child.canonicalName ?? child.scientificName}
              </a>
            ))}
            {enrichment.directChildren.length > 10 && (
              <Badge variant="secondary" className="rounded-full font-normal">
                +{enrichment.directChildren.length - 10} more
              </Badge>
            )}
          </div>
        </section>
      )}

      <section className="grid grid-cols-[repeat(auto-fit,minmax(116px,1fr))] gap-2.5">
        {facts.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-border/70 bg-muted/20 p-3"
          >
            <Icon className="mb-3 h-4 w-4 text-primary" />
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-foreground">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-border/70 bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Map className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Evolutionary context</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Rank
            </p>
            <p className="mt-1 font-medium capitalize">
              {inferredRank}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Current status
            </p>
            <p className="mt-1 font-medium">
              {node.attributes?.status ?? "Unspecified"}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Taxonomic profile</h3>
        </div>
        {taxonomy.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {taxonomy.map(({ label, value }) => (
              <Badge
                key={`${label}-${value}`}
                variant="secondary"
                className="rounded-md px-2.5 py-1 text-xs font-normal"
              >
                <span className="mr-1.5 text-muted-foreground">{label}</span>
                {value}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
            Detailed taxonomic fields have not been added for this branch yet.
          </p>
        )}
        {enrichment?.match && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <Badge variant="outline" className="rounded-full text-primary">
              GBIF matched
              {typeof enrichment.match.confidence === "number"
                ? ` · ${enrichment.match.confidence}%`
                : ""}
            </Badge>
            {enrichment.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary hover:underline"
              >
                {source.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
