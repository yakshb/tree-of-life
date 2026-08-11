import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CircleHelp } from "lucide-react";
import { SITE_URL, faqItems } from "@/lib/discovery";

const pageDescription =
  "Answers about Genosphere's interactive Tree of Life, audiences, biodiversity sources, scientific limitations, and planned research capabilities.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "Genosphere FAQ",
    description: pageDescription,
    type: "website",
    url: `${SITE_URL}/faq`,
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
    title: "Genosphere FAQ",
    description: pageDescription,
    images: [`${SITE_URL}/opengraph-image.jpg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq#webpage`,
  url: `${SITE_URL}/faq`,
  name: "Genosphere frequently asked questions",
  description: pageDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
  inLanguage: "en-US",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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

      <header className="mt-10 max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          <CircleHelp className="h-4 w-4" />
          Clear answers
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          About Genosphere
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          What the explorer does, where its biological context comes from, and how to interpret its
          scientific and AI-assisted results.
        </p>
      </header>

      <section aria-label="Frequently asked questions" className="mt-10 divide-y divide-border rounded-3xl border border-border/70 bg-card/70 px-5 sm:px-8">
        {faqItems.map((item) => (
          <article key={item.question} className="py-7 sm:py-8">
            <h2 className="text-lg font-bold">{item.question}</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{item.answer}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
