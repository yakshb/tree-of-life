"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Bot,
  CircleHelp,
  Database,
  Github,
  GitBranch,
  Layers3,
  MousePointer2,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const steps = [
  {
    number: "01",
    eyebrow: "Locate",
    title: "Find a branch",
    copy: "Search by organism, scientific name, or taxonomic group.",
    icon: Search,
  },
  {
    number: "02",
    eyebrow: "Trace",
    title: "Follow its lineage",
    copy: "Open nodes and move between ancestors without losing the map.",
    icon: GitBranch,
  },
  {
    number: "03",
    eyebrow: "Understand",
    title: "Ask the field guide",
    copy: "Explore traits, history, and relationships in the selected context.",
    icon: Bot,
  },
];

const states = [
  { label: "Living", color: "bg-emerald-500" },
  { label: "Extinct", color: "bg-rose-500" },
  { label: "Mixed", color: "bg-amber-500" },
  { label: "Origin", color: "bg-sky-500" },
  { label: "Unknown", color: "bg-slate-500" },
];

export default function AboutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 rounded-full px-2.5 text-xs font-bold sm:px-3"
        >
          <BookOpenText className="h-3.5 w-3.5 text-primary" />
          <span className="hidden sm:inline">Field guide</span>
          <span className="sm:hidden">Guide</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.25rem)] max-w-[800px] gap-0 overflow-y-auto rounded-3xl border-border/70 p-0 shadow-2xl">
        <DialogHeader className="relative overflow-hidden border-b border-border/60 px-5 pb-6 pt-5 pr-12 text-left sm:px-7 sm:pb-7 sm:pt-6">
          <div
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="mb-5 flex items-center justify-between gap-4">
              <Badge
                variant="outline"
                className="rounded-full border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary"
              >
                <Sparkles className="mr-1.5 h-3 w-3" />
                Expedition briefing
              </Badge>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:block">
                Field note 001
              </span>
            </div>
            <DialogTitle className="max-w-xl text-3xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-4xl">
              Read the tree.
              <span className="block text-muted-foreground">Follow the story of life.</span>
            </DialogTitle>
            <DialogDescription className="mt-4 max-w-2xl text-sm leading-6">
              Genosphere is a navigable evolutionary atlas. It combines a curated
              topology with live taxonomy and a context-aware AI field guide.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-7">
          <section aria-labelledby="guide-route-heading">
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  Your route
                </p>
                <h2 id="guide-route-heading" className="mt-1 text-base font-bold">
                  Start anywhere. Keep your context.
                </h2>
              </div>
              <MousePointer2 className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </div>

            <ol className="grid overflow-hidden rounded-2xl border border-border/70 bg-muted/20 sm:grid-cols-3">
              {steps.map(({ number, eyebrow, title, copy, icon: Icon }, index) => (
                <li
                  key={number}
                  className="group relative border-b border-border/70 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        {number} / {eyebrow}
                      </p>
                      <h3 className="mt-1 text-sm font-bold">{title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                        {copy}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <span className="absolute -right-2.5 top-5 z-10 hidden h-5 w-5 items-center justify-center rounded-full border bg-background text-muted-foreground sm:flex">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-2xl border border-border/70 p-4 sm:p-5" aria-labelledby="guide-map-heading">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <h2 id="guide-map-heading" className="text-sm font-bold">
                  How to read the map
                </h2>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Branches show curated evolutionary relationships. Node color
                describes the status of the organisms contained within it.
              </p>
              <div className="mt-4 rounded-xl border border-border/60 bg-muted/30 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-16 shrink-0 items-center justify-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                    <span className="h-4 w-4 rounded-full bg-primary/80" />
                    <span className="h-6 w-6 rounded-full bg-primary" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold">Size shows map scope</p>
                    <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                      Broader taxonomic ranks appear larger; direct curated
                      branches add a smaller size boost.
                    </p>
                  </div>
                </div>
                <p className="mt-2 border-t border-border/60 pt-2 text-[10px] leading-4 text-muted-foreground">
                  Size does not represent abundance, age, importance, or the
                  physical size of an organism.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {states.map(({ label, color }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className={`h-2 w-2 rounded-full ${color}`} />
                    {label}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-4 sm:p-5" aria-labelledby="guide-ai-heading">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <h2 id="guide-ai-heading" className="text-sm font-bold">
                  What the AI adds
                </h2>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                The field guide receives the selected node and its lineage, then
                uses Groq-hosted models to explain, compare, and answer in context.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                <Database className="h-3.5 w-3.5" />
                Curated map + live taxonomy
              </div>
            </section>
          </div>

          <nav aria-label="Project links" className="border-t border-border/60 pt-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              Explore further
            </p>
            <div className="flex flex-wrap gap-2">
              <DialogClose asChild>
                <Link
                  href="/use-cases"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-bold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Layers3 className="h-3.5 w-3.5" /> Use cases
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-bold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <CircleHelp className="h-3.5 w-3.5" /> FAQ
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <a
                  href="https://github.com/yakshb/tree-of-life"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-bold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </DialogClose>
            </div>
          </nav>

          <div className="flex flex-col gap-3 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl leading-5">
              The map is an exploration interface, not a complete scientific
              phylogeny. Verify important claims with primary sources.
            </p>
            <Badge variant="secondary" className="w-fit shrink-0 rounded-full px-3 py-1">
              124 curated nodes
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
