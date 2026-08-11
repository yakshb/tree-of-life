"use client";

import { motion } from "framer-motion";
import { ChevronRight, GitBranch, MoreHorizontal, Route } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ExplorationPathItem, TreeNodeData } from "@/types/treeTypes";

interface ExplorationPathProps {
  path: ExplorationPathItem[];
  onNavigate: (node: TreeNodeData, path: string[]) => void;
}

function PathButton({
  item,
  isCurrent,
  onClick,
}: {
  item: ExplorationPathItem;
  isCurrent: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`max-w-[5.5rem] truncate rounded-full px-2.5 py-1 text-xs font-medium transition-colors sm:max-w-[10rem] ${
        isCurrent
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
      }`}
      onClick={onClick}
      title={item.name}
      aria-current={isCurrent ? "page" : undefined}
    >
      {item.name}
    </button>
  );
}

export default function ExplorationPath({
  path,
  onNavigate,
}: ExplorationPathProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (path.length === 0) return null;

  const isCondensed = path.length > 3;
  const visibleItems = isCondensed
    ? [path[0], ...path.slice(-2)]
    : path;
  const hiddenCount = Math.max(0, path.length - visibleItems.length);

  const navigateTo = (item: ExplorationPathItem) => {
    setIsOpen(false);
    onNavigate(item.node, item.fullPath);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Selected evolutionary path"
      className="flex w-fit max-w-full min-w-0 items-center rounded-full border border-border/70 bg-background/85 p-1.5 shadow-sm backdrop-blur-md"
    >
      <Route className="mx-1 h-4 w-4 shrink-0 text-primary" />

      {visibleItems.map((item, index) => (
        <div key={item.node.id} className="flex min-w-0 items-center">
          {index > 0 && (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
          )}

          {isCondensed && index === 1 && (
            <>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mx-1 h-7 w-8 shrink-0 rounded-full text-muted-foreground hover:text-primary"
                    aria-label={`Show ${hiddenCount} hidden relationships`}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  side="bottom"
                  className="w-[min(20rem,calc(100vw-2rem))] p-0"
                >
                  <div className="border-b border-border/70 px-3.5 py-3">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Route className="h-4 w-4 text-primary" />
                      Full lineage
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {Math.max(0, path.length - 1)} relationships from Origin of Life
                    </p>
                  </div>
                  <div className="scrollbar-none max-h-[min(22rem,55vh)] overflow-y-auto p-2">
                    <div className="relative">
                      <div className="absolute bottom-4 left-[18px] top-4 w-px bg-border" />
                      {path.map((lineageItem, lineageIndex) => {
                        const isSelected = lineageIndex === path.length - 1;
                        return (
                          <button
                            key={lineageItem.node.id}
                            type="button"
                            className={`relative flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted ${
                              isSelected ? "bg-primary/10 text-primary" : ""
                            }`}
                            onClick={() => navigateTo(lineageItem)}
                            aria-current={isSelected ? "page" : undefined}
                          >
                            <span
                              className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-background ${
                                isSelected
                                  ? "border-primary text-primary"
                                  : "border-border text-muted-foreground"
                              }`}
                            >
                              <GitBranch className="h-3 w-3" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-xs font-medium">
                                {lineageItem.name}
                              </span>
                              <span className="block truncate text-[10px] capitalize text-muted-foreground">
                                {lineageItem.node.metadata.rank}
                              </span>
                            </span>
                            <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                              {lineageIndex + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
            </>
          )}

          <PathButton
            item={item}
            isCurrent={item.node.id === path[path.length - 1]?.node.id}
            onClick={() => navigateTo(item)}
          />
        </div>
      ))}
    </motion.nav>
  );
}
