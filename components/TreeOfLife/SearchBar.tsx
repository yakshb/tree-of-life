import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTreeSearch } from "@/hooks/useTreeSearch";
import { cn } from "@/lib/utils";
import type { TreeNodeData } from "@/types/treeTypes";

interface SearchBarProps {
  onNodeSelect: (node: TreeNodeData, path: string[]) => void;
  className?: string;
}

export function SearchBar({ onNodeSelect, className }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { searchResults, performSearch } = useTreeSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debounceSearch = window.setTimeout(() => {
      performSearch(searchTerm);
      setIsOpen(searchTerm.trim().length > 0);
    }, 220);

    return () => window.clearTimeout(debounceSearch);
  }, [searchTerm, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectResult = (node: TreeNodeData, path: string[]) => {
    onNodeSelect(node, path);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const firstResult = searchResults[0];
          if (firstResult) selectResult(firstResult.node, firstResult.path);
        }}
        className="relative"
      >
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onFocus={() => setIsOpen(searchTerm.trim().length > 0)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsOpen(false);
          }}
          placeholder="Search species or group…"
          className="h-11 rounded-xl border-border/70 bg-background/90 pl-10 pr-20 shadow-sm backdrop-blur-md"
          aria-label="Search the tree of life"
          aria-expanded={isOpen}
        />
        {searchTerm ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-9 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-primary"
          aria-label="Open first search result"
          disabled={searchResults.length === 0}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-border/70 bg-popover/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result) => (
                  <li key={result.path.join("/")}>
                    <button
                      type="button"
                      className="w-full rounded-xl p-3 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                      onClick={() => selectResult(result.node, result.path)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium">{result.node.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {result.path.join(" › ")}
                          </p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium uppercase text-primary">
                          {result.node.attributes?.taxonomicRank ?? "node"}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No matching species or groups found.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
