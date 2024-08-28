"use client";

import { ChatProvider } from "@/components/ai-interface/ChatContext";
import { IntroBadge } from "@/components/shared/IntroBadge";
import ParticlesDemo from "@/components/shared/ParticlesBackground";
import VisualTreeOfLife from "@/components/TreeOfLife/index";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <IntroBadge />
        <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-5xl md:text-6xl lg:text-7xl translate-y-[-1rem]">
          Evolution Meets AI
        </h1>
        {/* <h1 className="pointer-events-none tracking-tighter whitespace-pre-wrap mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-center text-5xl sm:text-6xl md:text-7xl font-bold leading-none text-transparent">
          Tree of Life Explorer
        </h1> */}
        <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
          Explore the diversity of life with AI assistance. Click on branches to
          learn more.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-8xl"
      >
        <ChatProvider>
          <VisualTreeOfLife />
        </ChatProvider>
      </motion.div>
    </main>
  );
}
