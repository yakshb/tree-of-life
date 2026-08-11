"use client";

import Link from "next/link";
import ThemeToggleButton from "./ThemeToggle";
import AboutModal from "./AboutModal";

const Header = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="group rounded-full py-1 pr-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href="/"
          aria-label="Genosphere home"
        >
          <span className="block text-lg font-bold leading-none tracking-[-0.035em] transition-colors group-hover:text-primary">
            Genosphere
          </span>
          <span className="mt-1 hidden text-[9px] font-bold uppercase leading-none tracking-[0.2em] text-muted-foreground sm:block">
            Evolution atlas
          </span>
        </Link>

        <div className="flex items-center gap-0.5 rounded-full border border-border/70 bg-background/75 p-1 shadow-sm shadow-black/[0.03]">
          <AboutModal />
          <span className="mx-0.5 h-4 w-px bg-border/80" aria-hidden="true" />
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
