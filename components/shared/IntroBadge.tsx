"use client"

import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { Network } from "lucide-react";

export function IntroBadge() {
  return (
    <div className="inline-flex items-center justify-between rounded-full backdrop-filter-[12px]">
      <div
        className={cn(
          "rounded-full border border-primary/15 bg-primary/5 text-sm text-foreground",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5">
          <Network className="mr-2 h-3.5 w-3.5 text-primary" />
          <span>Interactive evolution explorer</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}
