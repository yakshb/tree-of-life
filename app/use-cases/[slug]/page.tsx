import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Users } from "lucide-react";
import { SITE_URL, getUseCase, useCases } from "@/lib/discovery";

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  if (!useCase) notFound();

  const url = `${SITE_URL}/use-cases/${useCase.slug}`;

  return {
    title: useCase.name,
    description: useCase.description,
    keywords: [...useCase.keywords],
    alternates: { canonical: url },
    openGraph: {
      title: `${useCase.name} | Genosphere`,
      description: useCase.description,
      type: "website",
      url,
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
      title: `${useCase.name} | Genosphere`,
      description: useCase.description,
      images: [`${SITE_URL}/opengraph-image.jpg`],
    },
  };
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  if (!useCase) notFound();

  const pageUrl = `${SITE_URL}/use-cases/${useCase.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: useCase.name,
    description: useCase.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: useCase.fields.map((field) => ({ "@type": "Thing", name: field })),
    audience: useCase.audiences.map((audience) => ({ "@type": "Audience", audienceType: audience })),
    inLanguage: "en-US",
  };

  const relatedUseCases = useCases.filter((item) => item.slug !== useCase.slug);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link
        href="/use-cases"
        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All Genosphere use cases
      </Link>

      <header className="mt-10 max-w-4xl">
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
          {useCase.horizon}
        </span>
        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          {useCase.name}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          {useCase.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {useCase.fields.map((field) => (
            <span key={field} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs">
              {field}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <CheckCircle2 className="h-5 w-5 text-primary" /> What Genosphere supports today
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
            {useCase.available.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-border/70 bg-muted/35 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Clock3 className="h-5 w-5 text-primary" /> What comes next
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
            {useCase.next.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-5 rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Users className="h-5 w-5 text-primary" /> Questions this workspace can explore
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {useCase.questions.map((question) => (
            <p key={question} className="rounded-2xl bg-muted/60 p-4 text-sm leading-6">
              {question}
            </p>
          ))}
        </div>
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Intended for {useCase.audiences.join(", ")}. Genosphere is exploratory; verify important
          scientific claims against primary literature and the displayed source provenance.
        </p>
      </section>

      <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Start with the interactive tree</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select a node, inspect its evidence, and ask a grounded question.</p>
        </div>
        <Link
          href="/#explorer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Open the explorer <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <nav aria-label="Related use cases" className="mt-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">Related directions</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {relatedUseCases.map((item) => (
            <Link
              key={item.slug}
              href={`/use-cases/${item.slug}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
