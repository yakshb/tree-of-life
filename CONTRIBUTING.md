# Contributing to Genosphere

Genosphere is an open-source interactive Tree of Life, adaptive evolution tutor,
and foundation for biodiversity research tools. Contributions are welcome from
teachers, students, biologists, taxonomists, data curators, designers, software
engineers, and curious explorers. You do not need credentials in every field to
help; clearly scoped questions and carefully sourced corrections are valuable.

## Choose a contribution track

### Genosphere Biology

Help improve the scientific and educational layer:

- correct or expand the curated topology in `data/treeData.ts`;
- add evidence-backed summaries, ranks, geological ranges, and identifiers;
- review GBIF or iNaturalist reconciliation and media provenance;
- design lessons for the adaptive evolution tutor;
- prototype biodiversity observations, location overlays, or paleobiology data;
- identify synonyms, rank conflicts, missing data, and topology drift.

### Genosphere Framework

Help make the interaction model reusable beyond evolutionary biology:

- improve graph navigation, search, progressive lineage disclosure, or layout;
- refine the resizable node inspector and context-aware chat workspace;
- strengthen accessibility, mobile behavior, performance, and visual design;
- extract reusable graph, key-value, and relational-query primitives;
- improve API boundaries, tests, documentation, and deployment workflows.

Cross-disciplinary contributions are especially useful. A teacher might propose
a lesson flow while a developer implements it; a taxonomist might document a
conflict while a data engineer builds the review workflow.

## Before you start

1. Search existing issues and pull requests for related work.
2. Open an issue before a large topology, architecture, dependency, or product
   change. Describe the problem, proposed scope, evidence, and alternatives.
3. Keep a pull request focused enough to review without unrelated cleanup.
4. Never include API keys, private datasets, or media without a compatible
   license and attribution.

Small fixes, documentation improvements, and well-sourced data corrections can
go directly to a pull request.

## Local setup

Requirements:

- Node.js `^20.19`, `^22.13`, or `>=24`
- npm
- a GroqCloud API key only when testing live AI routes

```bash
git clone https://github.com/yakshb/tree-of-life.git
cd tree-of-life
npm install
cp .env.example .env.local
npm run dev
```

Set `GROQ_API_KEY` in `.env.local` to exercise chat, prompt generation, and the
live model catalog. The tree and most interface work can be developed without a
key. Never commit `.env.local`.

## Scientific contribution standard

Tree-of-life data contains uncertainty and competing interpretations. Scientific
pull requests should:

- cite an authoritative dataset, primary publication, or recognized reference;
- distinguish taxonomy (names and ranks) from phylogeny (relationships);
- preserve uncertainty instead of presenting contested relationships as fact;
- describe whether a change affects the curated teaching topology, live source
  enrichment, or both;
- retain source attribution and license information for images and media;
- run the normalization and audit paths rather than bypassing them.

Do not silently replace the editorial topology with a third-party taxonomy.
Reconciliation results should be reviewable and source-aware.

## Engineering contribution standard

- Follow the existing TypeScript, React, and Tailwind conventions.
- Keep server secrets and Groq requests in server-only routes.
- Validate new API inputs and preserve the configured Groq model allowlist.
- Make interactive controls keyboard accessible and usable in both themes.
- Add tests when a test harness exists for the affected area; until then,
  document manual verification and run the repository checks.
- Update user-facing documentation when behavior, setup, or limitations change.

Before opening a pull request, run:

```bash
npm run check
```

This runs ESLint, TypeScript checking, and a production build.

## Pull requests

Use a descriptive branch and commit history. In the pull request, include:

- the problem and why it matters;
- the approach and any trade-offs;
- screenshots or a short recording for interface changes;
- sources and uncertainty notes for scientific changes;
- verification performed and any remaining limitations;
- linked issues, when applicable.

Maintainers may ask for a narrower scope or additional evidence. Review comments
are about the contribution, not the contributor. Be specific, kind, and willing
to revise your assumptions.

## Good first contributions

- reproduce and document a navigation or accessibility issue;
- improve a node summary with a cited source;
- verify an image match and attribution;
- propose a classroom question set for one branch;
- add a missing audit case or error-state explanation;
- document how the graph interface could support another knowledge domain.

## Project boundaries

Genosphere is an exploratory educational tool, not a comprehensive phylogenetic
authority. AI responses can be wrong. Scientific claims should remain traceable
to sources, and research use should include independent verification.

By contributing, you agree that your contribution can be distributed under the
repository's MIT License. Thank you for helping Genosphere become a useful
meeting point for evolutionary biology, education, and relational interfaces.
