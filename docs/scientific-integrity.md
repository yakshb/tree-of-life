# Scientific integrity and data provenance

Genosphere is an exploratory teaching tool. It is not a comprehensive phylogeny,
a nomenclatural authority, or a publication-ready research dataset.

## Three information layers

The app combines information with different responsibilities:

1. **Curated topology** — `data/treeData.ts` provides a stable, approachable
   teaching map, summaries, and geological context.
2. **Live enrichment** — GBIF reconciles accepted names, ranks, lineage,
   descendants, identifiers, and occurrence media. iNaturalist independently
   provides confident common-name and taxon-media matches.
3. **AI explanation** — Groq-hosted models explain the selected node and suggest
   questions. Generated text is not a scientific source.

Taxonomy and phylogeny are not interchangeable. An accepted catalogue name does
not prove a particular evolutionary relationship, and a useful teaching group
may not correspond to a currently accepted rank.

## Evidence expectations

Scientific changes should:

- cite primary literature for contested evolutionary relationships;
- use recognized, preferably versioned taxonomic backbones for names and ranks;
- use authoritative specialist, museum, or university references for curated
  summaries and geological ranges;
- identify whether the change affects curated topology, live reconciliation, or
  explanatory content;
- preserve uncertainty when credible sources disagree;
- treat AI-generated claims and citations only as leads requiring verification.

Live API responses may change as providers update their catalogues. They can
enrich the curated topology, but must not silently rewrite it.

## Media policy

The Overview panel prefers an exact iNaturalist taxon image, then a clearly
labeled representative descendant, then attributed GBIF media. When no
trustworthy match exists, it should show a no-visual state.

Every accepted image should retain its provider link, attribution, license, and
representative status. Do not add generated species imagery, unlicensed media,
or an unrelated organism as a silent substitute.

## Proposing a correction

Use the repository's scientific-correction issue form. Include:

- the affected node and path;
- the current claim or behavior;
- the proposed correction;
- sources and why they apply;
- uncertainty or competing interpretations;
- media attribution and licensing when relevant.

A narrowly scoped, well-sourced correction is more useful than attempting to
make the entire topology comprehensive at once.
