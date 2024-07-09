import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Interactive Tree of Life Explorer",
  description: "Explore the diversity of life with AI assistance. Discover the evolutionary relationships between different life forms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <header className="fixed w-full bg-white shadow-sm">
          <div className="mx-auto py-6 px-8 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Tree of Life Explorer</h1>
          </div>
        </header>
        <main className="flex-grow">
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            © {new Date().getFullYear()} Tree of Life Explorer. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}