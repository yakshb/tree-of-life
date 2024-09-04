import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/shared/Header";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import ogImage from "@/app/opengraph-image.jpg";

const inter = Inter({ subsets: ["latin"], variable: "---font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Genosphere | Evolutionary Explorer",
    template: "%s | Genosphere",
  },
  description:
    "Explore the tree diagrams with AI-powered insights. Interactive tree-based visualizations, powered by advanced AI.",
  keywords: [
    "tree of life",
    "AI",
    "open source biology",
    "open source AI",
    "interactive learning",
    "evolution",
    "biodiversity",
    "phylogenetic tree",
    "educational tool",
    "biology visualization",
  ],
  authors: [{ name: "Yaksh Birla" }],
  creator: "Yaksh Birla",
  publisher: "Genosphere Team",
  openGraph: {
    title: "Genosphere | Decoding Life with AI",
    description:
      "Dive into the fascinating world of evolution with our AI-powered, interactive tree of life. Discover connections between species and explore biodiversity like never before.",
    type: "website",
    locale: "en_US",
    url: "https://genosphere.vercel.app",
    siteName: "Genosphere",
    images: [
      {
        url: `${ogImage.src}?v=${Date.now()}`,
        width: ogImage.width,
        height: ogImage.height,
        alt: "AI-Interactive visualization of evolution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TreeOfLifeAI", // Replace with your actual Twitter handle
    creator: "@yakshb", // Replace with your actual Twitter handle
    images: [`${ogImage.src}?v=${Date.now()}`],
    title: "Explore Evolution with AI | Tree of Life Explorer",
    description:
      "Discover the interconnectedness of life through our AI-powered, interactive evolutionary tree. Perfect for students, educators, and curious minds.",
  },
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
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
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: '#22c55e' },
  //   { media: '(prefers-color-scheme: dark)', color: '#4ade80' },
  // ],
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // enableSystem
        disableTransitionOnChange
      > */}
      {/* Wrap child content in Theme Provider */}
      {/* </ThemeProvider> */}
      <body
        className={cn(
          "min-h-full bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Header />
        <main className="flex-grow">
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            {children}
            <Analytics />
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            © {new Date().getFullYear()} Genosphere AI. All rights
            reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
