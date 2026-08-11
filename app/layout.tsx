import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource/ubuntu-mono/400.css";
import "@fontsource/ubuntu-mono/700.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/shared/Header";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import ogImage from "@/app/opengraph-image.jpg";
import { SITE_URL, siteDescription } from "@/lib/discovery";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Genosphere",
  title: {
    default: "Genosphere — Interactive Tree of Life & Evolution Tutor",
    template: "%s | Genosphere",
  },
  description: siteDescription,
  keywords: [
    "interactive tree of life",
    "adaptive evolution tutor",
    "biodiversity field guide",
    "taxonomic curation workbench",
    "paleobiology timeline",
    "taxonomy explorer",
    "species relationship map",
    "tree of life",
    "evolution",
    "biodiversity",
    "phylogenetic tree",
    "evolution teaching tool",
    "biodiversity research tool",
    "open source biology",
  ],
  authors: [{ name: "Yaksh Birla" }],
  creator: "Yaksh Birla",
  publisher: "Genosphere",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Genosphere — Interactive Tree of Life & Evolution Tutor",
    description: siteDescription,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Genosphere",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "Genosphere interactive Tree of Life explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.src],
    title: "Genosphere — Interactive Tree of Life & Evolution Tutor",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Science and education",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t border-border bg-background">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} Genosphere. Open-source evolution atlas.</p>
              <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <Link className="transition-colors hover:text-foreground" href="/#explorer">
                  Explorer
                </Link>
                <Link className="transition-colors hover:text-foreground" href="/use-cases">
                  Use cases
                </Link>
                <Link className="transition-colors hover:text-foreground" href="/faq">
                  FAQ
                </Link>
                <a
                  className="transition-colors hover:text-foreground"
                  href="https://github.com/yakshb/tree-of-life"
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
