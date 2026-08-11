import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FlaskConical, Sparkles } from "lucide-react";
import { SITE_URL, useCases } from "@/lib/discovery";

const pageDescription =
  "Explore how Genosphere supports adaptive evolution learning and can grow into a biodiversity field guide, taxonomic curation workbench, and paleobiology timeline.";

export const metadata: Metadata = {
  title: "Use Cases",
  description: pageDescription,
  keywords: useCases.flatMap((useCase) => [...useCase.keywords]),
  alternates: { canonical: `${SITE_URL}/use-cases` },
  openGraph: {
    title: "Genosphere Use Cases",
    description: pageDescription,
    type: "website",
    url: `${SITE_URL}/use-cases`,
    siteName: "Genosphere",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Genosphere interactive Tree of Life explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Genosphere Use Cases",
    description: pageDescription,
    images: [`${SITE_URL}/opengraph-image.jpg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/use-cases#webpage`,
  url: `${SITE_URL}/use-cases`,
  name: "Genosphere use cases",
  description: pageDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: useCases.map((useCase, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/use-cases/${useCase.slug}`,
      name: useCase.name,
      description: useCase.shortDescription,
    })),
  },
  inLanguage: "en-US",
};

export default function UseCasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to the explorer
      </Link>

      <header className="mt-10 max-w-4xl">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-4 w-4" />
          From learning map to research interface
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          One relational canvas, four paths forward.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          Genosphere is useful today as an interactive evolution tutor and is designed to grow into
          a field guide, curation workbench, and paleobiology timeline. Each direction states what
          exists now and what remains on the roadmap.
        </p>
      </header>

      <section aria-label="Genosphere use cases" className="mt-10 grid gap-4 md:grid-cols-2">
        {useCases.map((useCase) => (
          <article
            key={useCase.slug}
            className="group flex min-h-64 flex-col rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm transition-colors hover:border-primary/40 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                {useCase.horizon}
              </span>
              <FlaskConical className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight">{useCase.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
              {useCase.shortDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label={`${useCase.name} fields`}>
              {useCase.fields.map((field) => (
                <span key={field} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {field}
                </span>
              ))}
            </div>
            <Link
              href={`/use-cases/${useCase.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              Explore this use case <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
