"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ChevronsUpDown,
  Compass,
  GitBranch,
  GripVertical,
  MousePointer2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type ReactD3Tree from "react-d3-tree";
import type { Point } from "react-d3-tree";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { treeData } from "@/data/treeData";
import type { ExplorationPathItem, TreeNodeData } from "@/types/treeTypes";
import { AISettingsProvider } from "../ai-interface/AISettingsContext";
import CustomNodeRenderer from "./CustomNodeRenderer";
import ExplorationPath from "./ExplorationPath";
import NodeLegend from "./NodeLegend";
import { SearchBar } from "./SearchBar";
import SpeciesSidebar from "./SpeciesSidebar";

const DynamicTree = dynamic(() => import("./DynamicTreeCanvas"), { ssr: false });
const rootNode = treeData;

function findNodeByPath(node: TreeNodeData, path: string[]): TreeNodeData | null {
  if (path.length === 0 || node.name !== path[0]) return null;
  if (path.length === 1) return node;

  for (const child of node.children ?? []) {
    const found = findNodeByPath(child, path.slice(1));
    if (found) return found;
  }
  return null;
}

function findPathToNode(
  current: TreeNodeData,
  target: TreeNodeData,
  trail: TreeNodeData[] = [],
): TreeNodeData[] | null {
  const nextTrail = [...trail, current];
  if (current.id === target.id) return nextTrail;

  for (const child of current.children ?? []) {
    const result = findPathToNode(child, target, nextTrail);
    if (result) return result;
  }
  return null;
}

function buildExplorationPath(nodes: TreeNodeData[]): ExplorationPathItem[] {
  return nodes.map((node, index) => ({
    name: node.name,
    node,
    fullPath: nodes.slice(0, index + 1).map((item) => item.name),
  }));
}

function countNodes(node: TreeNodeData): number {
  return 1 + (node.children ?? []).reduce((total, child) => total + countNodes(child), 0);
}

function getInitialTreeY(width: number, height: number) {
  return width < 640 ? 175 : Math.max(90, height * 0.13);
}

const nodeCount = countNodes(rootNode);

export default function VisualTreeOfLife() {
  const [explorationPath, setExplorationPath] = useState<ExplorationPathItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.82);
  const [treeKey, setTreeKey] = useState(0);
  const [initialDepth, setInitialDepth] = useState<number | undefined>(2);
  const [sidebarWidth, setSidebarWidth] = useState(430);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<ReactD3Tree | null>(null);
  const centerTimerRef = useRef<number | null>(null);
  const hasPositionedTree = useRef(false);
  const previousDimensions = useRef({ width: 0, height: 0 });
  const sidebarDragStart = useRef({ pointerX: 0, width: 430 });

  useEffect(() => {
    const container = treeContainerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
      if (!hasPositionedTree.current && width > 0 && height > 0) {
        setTranslate({ x: width / 2, y: getInitialTreeY(width, height) });
        hasPositionedTree.current = true;
      } else if (previousDimensions.current.width > 0) {
        const widthChange = width - previousDimensions.current.width;
        if (Math.abs(widthChange) > 0.5) {
          setTranslate((current) => ({
            x: current.x + widthChange / 2,
            y: current.y,
          }));
        }
      }
      previousDimensions.current = { width, height };
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (centerTimerRef.current !== null) {
        window.clearTimeout(centerTimerRef.current);
      }
    },
    [],
  );

  const selectNode = useCallback((node: TreeNodeData, nodes: TreeNodeData[]) => {
    setSelectedNode(node);
    setExplorationPath(buildExplorationPath(nodes));
  }, []);

  const handleNodeClick = useCallback(
    (node: TreeNodeData) => {
      selectNode(node, findPathToNode(rootNode, node) ?? [node]);
    },
    [selectNode],
  );

  const revealAndCenterNode = useCallback(
    (node: TreeNodeData, lineage: TreeNodeData[]) => {
      const tree = treeRef.current;
      if (!tree) return;

      const expandedIds = new Set(lineage.map((item) => item.id));
      const data = structuredClone(tree.state.data);

      const expandLineage = (nodes: typeof data) => {
        for (const current of nodes) {
          const currentNode = current as typeof current & TreeNodeData;
          if (expandedIds.has(currentNode.id)) {
            current.__rd3t.collapsed = false;
          }
          if (current.children) expandLineage(current.children as typeof data);
        }
      };

      expandLineage(data);
      tree.setState({ data }, () => {
        if (centerTimerRef.current !== null) {
          window.clearTimeout(centerTimerRef.current);
        }

        // Wait for the details sidebar and tree branch transitions to settle so
        // centering uses the final canvas dimensions and node coordinates.
        centerTimerRef.current = window.setTimeout(() => {
          const target = tree
            .generateTree()
            .nodes.find(
              (candidate) =>
                (candidate.data as TreeNodeData).id === node.id,
            );
          if (target) tree.centerNode(target);
          centerTimerRef.current = null;
        }, 520);
      });
    },
    [],
  );

  const handleNodeSelect = useCallback(
    (node: TreeNodeData, path: string[]) => {
      const nodes = path.flatMap((_, index) => {
        const found = findNodeByPath(rootNode, path.slice(0, index + 1));
        return found ? [found] : [];
      });
      const resolvedLineage = nodes.length === path.length ? nodes : [node];
      selectNode(node, resolvedLineage);
      revealAndCenterNode(node, resolvedLineage);
    },
    [revealAndCenterNode, selectNode],
  );

  const resetChart = useCallback(() => {
    setTranslate({
      x: dimensions.width / 2,
      y: getInitialTreeY(dimensions.width, dimensions.height),
    });
    setSelectedNode(null);
    setExplorationPath([]);
    setZoom(0.82);
    setInitialDepth(2);
    setTreeKey((key) => key + 1);
  }, [dimensions]);

  const expandAllNodes = useCallback(() => {
    setInitialDepth(undefined);
    setTreeKey((key) => key + 1);
  }, []);

  const handleZoom = useCallback((direction: "in" | "out") => {
    setZoom((currentZoom) => {
      const nextZoom = direction === "in" ? currentZoom * 1.2 : currentZoom / 1.2;
      return Math.min(2.4, Math.max(0.2, nextZoom));
    });
  }, []);

  const zoomLabel = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom]);

  const getSidebarBounds = useCallback(() => {
    const workspaceWidth = workspaceRef.current?.getBoundingClientRect().width ?? 0;
    return {
      min: 360,
      max: Math.max(360, Math.min(680, workspaceWidth * 0.45)),
    };
  }, []);

  const clampSidebarWidth = useCallback(
    (width: number) => {
      const bounds = getSidebarBounds();
      return Math.min(bounds.max, Math.max(bounds.min, width));
    },
    [getSidebarBounds],
  );

  const handleSidebarResizeStart = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      sidebarDragStart.current = {
        pointerX: event.clientX,
        width: sidebarWidth,
      };
      setIsResizingSidebar(true);
    },
    [sidebarWidth],
  );

  const handleSidebarResizeMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
      const distance = sidebarDragStart.current.pointerX - event.clientX;
      setSidebarWidth(clampSidebarWidth(sidebarDragStart.current.width + distance));
    },
    [clampSidebarWidth],
  );

  const handleSidebarResizeEnd = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setIsResizingSidebar(false);
    },
    [],
  );

  const handleSidebarResizeKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      const bounds = getSidebarBounds();
      let nextWidth: number | null = null;

      if (event.key === "ArrowLeft") nextWidth = sidebarWidth + 24;
      if (event.key === "ArrowRight") nextWidth = sidebarWidth - 24;
      if (event.key === "Home") nextWidth = bounds.min;
      if (event.key === "End") nextWidth = bounds.max;
      if (nextWidth === null) return;

      event.preventDefault();
      setSidebarWidth(clampSidebarWidth(nextWidth));
    },
    [clampSidebarWidth, getSidebarBounds, sidebarWidth],
  );

  return (
    <AISettingsProvider>
      <section className="mx-auto w-full max-w-[1800px] px-3 sm:px-5 lg:px-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-sm font-bold">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <GitBranch className="h-4 w-4" />
            </span>
            <h1 className="truncate">Interactive Tree of Life</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-card px-3 py-1.5">
              {nodeCount} curated nodes
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1.5">
              Groq powered
            </span>
          </div>
        </div>

        <div
          ref={workspaceRef}
          className={`explorer-workspace ${selectedNode ? "is-sidebar-open" : ""} ${isResizingSidebar ? "is-resizing" : ""}`}
          style={
            {
              "--species-sidebar-width": `${sidebarWidth}px`,
            } as CSSProperties
          }
        >
          <div className="explorer-surface relative min-w-0 overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-[0_24px_70px_-48px_rgba(16,185,129,0.4)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.13),transparent_43%),linear-gradient(to_right,hsl(var(--border)/0.32)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.32)_1px,transparent_1px)] bg-[size:auto,34px_34px,34px_34px]" />

            <div className="absolute left-3 right-3 top-3 z-20 flex flex-col gap-2 sm:left-4 sm:right-4 sm:top-4 sm:flex-row sm:items-start sm:justify-between">
              <SearchBar
                onNodeSelect={handleNodeSelect}
                className="w-full sm:max-w-md"
              />
              <TooltipProvider delayDuration={250}>
                <div className="flex w-fit items-center gap-1 rounded-xl border border-border/70 bg-background/85 p-1 shadow-sm backdrop-blur-md">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      onClick={() => handleZoom("out")}
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom out</TooltipContent>
                </Tooltip>
                <span className="w-12 text-center text-xs font-semibold tabular-nums text-muted-foreground">
                  {zoomLabel}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      onClick={() => handleZoom("in")}
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom in</TooltipContent>
                </Tooltip>
                <div className="mx-1 h-5 w-px bg-border" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      onClick={expandAllNodes}
                      aria-label="Expand every branch"
                    >
                      <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Expand every branch</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      onClick={resetChart}
                      aria-label="Reset tree view"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset tree view</TooltipContent>
                </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            <div className="absolute left-3 right-3 top-[116px] z-10 sm:left-4 sm:right-auto sm:top-[72px] sm:max-w-[calc(100%-2rem)]">
              <ExplorationPath path={explorationPath} onNavigate={handleNodeSelect} />
            </div>

            <div ref={treeContainerRef} className="absolute inset-0">
              {dimensions.width > 0 && dimensions.height > 0 && (
                <DynamicTree
                ref={treeRef}
                key={treeKey}
                data={rootNode}
                orientation="vertical"
                pathFunc="diagonal"
                renderCustomNodeElement={(treeProps) => (
                  <CustomNodeRenderer
                    nodeDatum={treeProps.nodeDatum as TreeNodeData}
                    toggleNode={treeProps.toggleNode}
                    onNodeClick={handleNodeClick}
                    isSelected={
                      selectedNode?.id ===
                      (treeProps.nodeDatum as TreeNodeData).id
                    }
                  />
                )}
                separation={{ siblings: 1.25, nonSiblings: 1.7 }}
                transitionDuration={450}
                centeringTransitionDuration={500}
                translate={translate}
                dimensions={dimensions}
                nodeSize={{ x: dimensions.width < 640 ? 145 : 185, y: 165 }}
                zoom={zoom}
                initialDepth={initialDepth}
                scaleExtent={{ min: 0.2, max: 2.4 }}
                zoomable
                draggable
                collapsible
                pathClassFunc={() => "tree-link"}
                svgClassName="tree-canvas"
                onUpdate={({ zoom: nextZoom, translate: nextTranslate }) => {
                  setZoom(nextZoom);
                  setTranslate(nextTranslate);
                }}
                />
              )}
            </div>

            <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3 sm:bottom-4 sm:left-4 sm:right-4">
              <div className="pointer-events-auto max-w-full overflow-x-auto">
                <NodeLegend />
              </div>
              <div className="hidden items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur-md md:flex">
                <MousePointer2 className="h-3.5 w-3.5 text-primary" />
                Drag to pan · scroll to zoom · click to explore
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
              <Compass className="h-40 w-40 text-primary/5" />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {selectedNode && (
              <div key={selectedNode.id} className="relative min-w-0">
                <button
                  type="button"
                  role="separator"
                  aria-label="Resize species sidebar"
                  aria-orientation="vertical"
                  aria-valuemin={360}
                  aria-valuemax={680}
                  aria-valuenow={Math.round(sidebarWidth)}
                  title="Drag to resize · double-click to reset"
                  className="group absolute -left-2.5 top-1/2 z-30 hidden h-24 w-5 -translate-y-1/2 touch-none cursor-col-resize items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-[1100px]:flex"
                  onPointerDown={handleSidebarResizeStart}
                  onPointerMove={handleSidebarResizeMove}
                  onPointerUp={handleSidebarResizeEnd}
                  onPointerCancel={handleSidebarResizeEnd}
                  onKeyDown={handleSidebarResizeKeyDown}
                  onDoubleClick={() => setSidebarWidth(clampSidebarWidth(430))}
                >
                  <span className="flex h-12 w-3 items-center justify-center rounded-full border border-border/80 bg-background/95 text-muted-foreground shadow-sm transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    <GripVertical className="h-3.5 w-3.5" />
                  </span>
                </button>
                <SpeciesSidebar
                  node={selectedNode}
                  onClose={() => setSelectedNode(null)}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </AISettingsProvider>
  );
}
