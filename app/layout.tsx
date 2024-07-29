import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/shared/Header";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
// import ogImage from "@/app/opengraph-image.jpg";

const inter = Inter({ subsets: ["latin"], variable: "---font-sans" });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://yakshb.com/"),
//   // title: "Yaksh Birla",
//   title: {
//     default: "Yaksh Birla",
//     template: "%s | Yaksh Birla",
//   },
//   description:
//     "Yaksh Birla is an investor, developer and technologist with years of experience in investment banking and financial services. This is his personal page, where he codes and writes.",
//   openGraph: {
//     title: "Yaksh Birla's Personal Page",
//     description:
//       "Yaksh Birla | Investor, developer and technologist with years of experience in investment banking and financial services. This personal page is where he explores his curiosity and shares what he learns along the way.",
//     type: "website",
//     locale: "en_US",
//     url: "https://yakshb.com",
//     siteName: "Yaksh Birla's Personal Page",
//     images: [
//       {
//         url: `${ogImage.src}?v=${Date.now()}`,
//         width: ogImage.width,
//         height: ogImage.height,
//         alt: 'Yaksh Birla - Investor, Developer, Technologist',
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     images: [ogImage.src],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "min-h-full bg-background font-sans antialiased",
            inter.variable
          )}
        >
          <Header />
          <main className="flex-grow">
            <div className="mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
              © {new Date().getFullYear()} Tree of Life Explorer. All rights
              reserved.
            </div>
          </footer>
        </body>
      </ThemeProvider>
    </html>
  );
}
