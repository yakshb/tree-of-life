"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="group relative h-8 w-[3.25rem] rounded-full bg-muted/80 p-1 text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Sun className="absolute left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-amber-500/70" />
      <Moon className="absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-sky-400/70" />
      <span className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border/80 bg-background text-foreground shadow-sm transition-transform duration-300 dark:translate-x-5">
        <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
    </button>
  );
}
