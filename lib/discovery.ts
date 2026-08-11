export const SITE_URL = "https://genosphere.vercel.app";

export const siteDescription =
  "Explore evolution with an interactive tree of life, adaptive AI tutor, biodiversity field guide, taxonomic context, and paleobiology data for learners and researchers.";

export const useCases = [
  {
    slug: "adaptive-evolution-tutor",
    name: "Adaptive evolution tutor",
    horizon: "Available now",
    shortDescription:
      "Turn any selected branch into a focused lesson with node-grounded explanations, comparisons, and follow-up questions.",
    description:
      "Genosphere pairs an interactive phylogenetic tree with a context-aware AI field guide. Teachers, students, and independent learners can select a taxon, inspect its lineage, and ask for explanations at the depth they need.",
    fields: [
      "Evolutionary relationships",
      "Adaptive traits",
      "Geological context",
      "Guided questions",
    ],
    audiences: ["Teachers", "Students", "Independent learners"],
    available: [
      "Search, pan, zoom, and expand a curated Tree of Life topology.",
      "Ask node-grounded questions and compare traits or branches in a resizable workspace.",
      "Use generated prompts to begin a lesson or pursue a new line of inquiry.",
    ],
    next: [
      "Lesson pathways that adapt to age, curriculum, and prior questions.",
      "Teacher-authored collections, classroom activities, and shareable explorations.",
    ],
    questions: [
      "How did a trait change across this lineage?",
      "Which branch is the closest comparison for this taxon?",
      "How can I explain this evolutionary relationship to a class?",
    ],
    keywords: [
      "adaptive evolution tutor",
      "AI evolution tutor",
      "interactive evolution lesson",
      "phylogenetic learning tool",
      "evolution teaching tool",
    ],
  },
  {
    slug: "biodiversity-field-guide",
    name: "Biodiversity field guide",
    horizon: "Near-term extension",
    shortDescription:
      "Connect taxonomy, licensed media, common names, observations, and location overlays around each branch of life.",
    description:
      "Genosphere already reconciles curated nodes with GBIF and iNaturalist for accepted names, common names, licensed media, lineage, and descendant context. Observation and location overlays are the next step toward a spatial biodiversity field guide.",
    fields: [
      "Taxonomy",
      "Licensed media",
      "Common names",
      "Observations",
      "Location overlays",
    ],
    audiences: ["Naturalists", "Educators", "Field researchers"],
    available: [
      "Curated biological summaries and taxonomic profiles for mapped nodes.",
      "Live GBIF name reconciliation, lineage, descendants, and provenance.",
      "iNaturalist common names and attributed taxon imagery when a confident match exists.",
    ],
    next: [
      "Observation density and location overlays with clear source attribution.",
      "Geographic, conservation, and recency filters for field exploration.",
    ],
    questions: [
      "What is the accepted name and common name for this taxon?",
      "Which related taxa are observed in this region?",
      "What media and observation evidence supports this profile?",
    ],
    keywords: [
      "biodiversity field guide",
      "interactive taxonomy explorer",
      "species observation map",
      "GBIF iNaturalist explorer",
      "biodiversity education tool",
    ],
  },
  {
    slug: "taxonomic-curation-workbench",
    name: "Taxonomic curation workbench",
    horizon: "Medium-term direction",
    shortDescription:
      "Detect synonyms, rank conflicts, missing evidence, and topology drift before they become silent data errors.",
    description:
      "The repository already separates curated topology from live taxonomic reconciliation and audits missing fields. A fuller workbench can turn those foundations into review queues for synonyms, rank conflicts, unresolved names, and topology drift.",
    fields: [
      "Synonyms",
      "Rank conflicts",
      "Missing data",
      "Topology drift",
      "Provenance",
    ],
    audiences: ["Taxonomists", "Data curators", "Biodiversity informaticians"],
    available: [
      "A standardized curated seed with stable identifiers and normalized attributes.",
      "GBIF reconciliation with explicit match status, provenance, and warnings.",
      "Audits for missing descriptions, geological ranges, ranks, and external identifiers.",
    ],
    next: [
      "Review queues for synonym changes, rank conflicts, and unresolved names.",
      "Versioned topology comparisons and source-aware drift reports.",
      "Exportable correction proposals rather than silent source overwrites.",
    ],
    questions: [
      "Which curated names now resolve to synonyms?",
      "Where do source ranks conflict with the editorial topology?",
      "Which branches changed between taxonomy releases?",
    ],
    keywords: [
      "taxonomic curation workbench",
      "taxonomy synonym detection",
      "taxonomic rank conflict",
      "taxonomy data quality",
      "phylogenetic topology drift",
    ],
  },
  {
    slug: "paleobiology-timeline",
    name: "Paleobiology timeline",
    horizon: "Medium-term direction",
    shortDescription:
      "Explore taxa through geological time, evolutionary radiations, and extinction events without losing their lineage context.",
    description:
      "Mapped taxa already carry standardized geological ranges and living or extinct status. A dedicated timeline can turn those fields into temporal filters, extinction-event overlays, and comparisons across evolutionary eras.",
    fields: [
      "Geological time",
      "Extinction events",
      "Taxon ranges",
      "Evolutionary radiations",
      "Living status",
    ],
    audiences: ["Paleobiologists", "Museum educators", "Evolution researchers"],
    available: [
      "Geological-range labels and living, extinct, or mixed status on curated nodes.",
      "Lineage exploration that keeps fossil groups connected to the broader Tree of Life.",
      "Node-grounded questions about time ranges, traits, and evolutionary context.",
    ],
    next: [
      "A geological time slider with period and epoch filters.",
      "Mass-extinction, first-appearance, and last-appearance overlays.",
      "Connections to vetted fossil occurrence and paleobiology datasets.",
    ],
    questions: [
      "Which branches cross this extinction boundary?",
      "When did this lineage first appear in the fossil record?",
      "Which related groups lived during the same geological interval?",
    ],
    keywords: [
      "paleobiology timeline",
      "geological time explorer",
      "extinction event visualization",
      "fossil taxonomy explorer",
      "evolutionary timeline tool",
    ],
  },
] as const;

export const faqItems = [
  {
    question: "What is Genosphere?",
    answer:
      "Genosphere is an open-source interactive Tree of Life explorer. It combines a curated evolutionary topology, live biodiversity-source enrichment, and a Groq-powered tutor so people can inspect a taxon and ask questions without leaving the map.",
  },
  {
    question: "Who is Genosphere for?",
    answer:
      "Genosphere is designed for teachers, students, researchers, naturalists, museum educators, data curators, and anyone curious about how life is related.",
  },
  {
    question: "Where does Genosphere get taxonomy and species media?",
    answer:
      "The app starts with a curated 124-node teaching topology, reconciles names and lineage data with GBIF, and checks iNaturalist for confident common-name and attributed-media matches. Provenance and match warnings remain visible.",
  },
  {
    question: "Is Genosphere a complete or publication-ready phylogeny?",
    answer:
      "No. It is an exploratory and educational map, not a comprehensive phylogenetic authority. Researchers should inspect the displayed provenance and verify claims against primary literature and authoritative datasets.",
  },
  {
    question: "Does Genosphere include observation maps and a paleobiology timeline?",
    answer:
      "Not yet. Taxonomy, common names, sourced media, descendant context, geological ranges, and living status provide the foundation. Observation and location overlays are a near-term extension; temporal filters and extinction-event overlays are a medium-term direction.",
  },
] as const;

export function getUseCase(slug: string) {
  return useCases.find((useCase) => useCase.slug === slug);
}
