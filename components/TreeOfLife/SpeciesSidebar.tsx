"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Bot,
  BookOpen,
  GitBranch,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import AIAssistant, {
  type AIAssistantHandle,
} from "@/components/ai-interface/AIAssistant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TreeNodeData } from "@/types/treeTypes";
import InfoPanel from "./InfoPanel";

interface SpeciesSidebarProps {
  node: TreeNodeData;
  onClose: () => void;
}

function statusClasses(status?: string) {
  const normalized = status?.toLowerCase() ?? "";
  if (normalized.includes("extinct") && normalized.includes("living")) {
    return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
  }
  if (normalized.includes("living")) {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }
  if (normalized === "extinct") {
    return "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300";
  }
  return "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300";
}

export default function SpeciesSidebar({ node, onClose }: SpeciesSidebarProps) {
  const assistantRef = useRef<AIAssistantHandle>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [hasConversation, setHasConversation] = useState(false);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 18 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      aria-labelledby="species-sidebar-title"
      className="explorer-surface flex w-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-border/70 bg-background shadow-[0_20px_60px_-48px_rgba(15,23,42,0.5)]"
    >
      <Tabs
        key={node.name}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex min-h-0 flex-1 flex-col"
      >
        <header className="shrink-0 border-b border-border/70 px-3 py-2.5">
          <div className="flex h-7 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">Genosphere AI</span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {node.attributes?.status && (
                <Badge
                  variant="outline"
                  className={`max-w-32 truncate rounded-full px-2 py-0.5 text-[10px] ${statusClasses(node.attributes.status)}`}
                >
                  {node.attributes.status}
                </Badge>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={onClose}
                aria-label="Close species sidebar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-1.5 flex min-w-0 items-end gap-2">
            <div className="min-w-0 flex-1 pb-0.5">
              <div className="mb-0.5 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <GitBranch className="h-3 w-3 shrink-0 text-primary" />
                <span className="truncate">
                  {node.attributes?.taxonomicRank ?? "Life form"}
                </span>
              </div>
              <h2
                id="species-sidebar-title"
                className="truncate text-lg font-semibold leading-5 tracking-tight"
              >
                {node.name}
              </h2>
              {node.attributes?.scientificName && (
                <p className="mt-0.5 truncate text-[10px] italic text-muted-foreground">
                  {node.attributes.scientificName}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <TabsList className="h-8 rounded-full bg-muted/70 p-1">
                <TabsTrigger
                  value="overview"
                  className="h-6 gap-1.5 rounded-full px-2.5 text-[11px]"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className="h-6 gap-1.5 rounded-full px-2.5 text-[11px]"
                >
                  <Bot className="h-3.5 w-3.5" />
                  Ask AI
                </TabsTrigger>
              </TabsList>
              {activeTab === "ai" && hasConversation && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-muted-foreground"
                  onClick={() => assistantRef.current?.clearConversation()}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </header>

        <TabsContent
          value="overview"
          className="mt-0 min-h-0 flex-1 overflow-y-auto px-4 py-5"
        >
          <InfoPanel key={node.id} node={node} />
        </TabsContent>
        <TabsContent
          value="ai"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
        >
          <AIAssistant
            ref={assistantRef}
            key={node.name}
            node={node}
            onConversationStateChange={setHasConversation}
          />
        </TabsContent>
      </Tabs>
    </motion.aside>
  );
}
