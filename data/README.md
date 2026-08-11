# Taxonomy data architecture

`treeData.ts` is a curated navigation seed, not a claim to contain every known
taxon. The application combines that stable, editorially useful topology with
live enrichment from biodiversity catalogues.

## Normalization contract

Every exported tree node receives:

- a stable, path-based `id`;
- an explicit taxonomic rank;
- a normalized lifecycle and branch type;
- a lineage map without literal `N/A` placeholders;
- common-name, source, and data-quality containers;
- completeness scoring and actionable quality flags.

`auditTreeData()` runs when the dataset is imported. It rejects duplicate IDs,
placeholder values that survived normalization, and synthetic concepts inside
the biological tree. The former `Digital Entities` subtree is retained through
`supplementalConcepts`, but is intentionally excluded from the biological
topology.

## Source responsibilities

- **Curated seed:** approachable overview, geological ranges, editorial summaries.
- **GBIF:** name reconciliation, accepted taxonomy, lineage, direct descendants,
  occurrence media, and source links.
- **iNaturalist:** independently matched taxon images and common names, including
  exact higher-taxon records that GBIF does not reconcile.

## Media coverage policy

The Overview panel uses sourced media only. Image selection is deterministic:

1. use an exact iNaturalist taxon image when one exists;
2. otherwise use a clearly labeled representative descendant returned by
   iNaturalist for a matched higher taxon;
3. use attributed GBIF taxon or occurrence media when available;
4. show an explicit no-visual state rather than inventing or silently
   substituting an image.

Curated aliases are reserved for topology labels that do not exist as accepted
iNaturalist taxa. For example, `Gorillini` uses `Gorilla` as a labeled
representative. Every media asset retains its provider link and attribution.

## Next expansion stage

The next data release should use Open Tree of Life for phylogenetic topology and
Catalogue of Life/ChecklistBank for versioned taxonomic names. Build-time
snapshots should be generated from pinned source releases, reviewed, and then
committed as reproducible artifacts. Live APIs should enrich those snapshots,
not silently rewrite their topology.
