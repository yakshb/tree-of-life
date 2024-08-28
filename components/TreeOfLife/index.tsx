"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { treeData } from "../../data/treeData";
import styles from "@/styles/TreeStyles.module.css";
import AIAssistant from "../ai-interface/AIAssistant";
import InfoPanel from "./InfoPanel";
import ExplorationPath from "./ExplorationPath";
import CustomNodeRenderer from "./CustomNodeRenderer";
import { TreeNodeDatum, Point } from "react-d3-tree";
import { ExplorationPathItem } from "@/types/treeTypes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  ChevronsUpDown,
} from "lucide-react";
import NodeLegend from "./NodeLegend";
import { useTreeSearch } from "@/hooks/useTreeSearch";
import { SearchBar } from "./SearchBar";
import AISettings from "../ai-interface/AISettings";
import { AISettingsProvider } from "../ai-interface/AISettingsContext";

const DynamicTree = dynamic(() => import("react-d3-tree"), { ssr: false });

// interface TreeNodeData extends TreeNodeDatum {
//   children?: TreeNodeData[];
//   attributes?: {
//     description?: string;
//     status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
//   };
// }

interface TreeNodeData extends TreeNodeDatum {
  children?: TreeNodeData[];
  attributes?: {
    scientificName?: string;
    description?: string;
    age?: string;
    status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
    domain?: string;
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
    geologicalAge?: string;
  };
}

const VisualTreeOfLife: React.FC = () => {
  const [aiResponse, setAIResponse] = useState("");
  const [explorationPath, setExplorationPath] = useState<ExplorationPathItem[]>(
    []
  );
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const treeWrapperRef = useRef<any>(null);
  const { performSearch } = useTreeSearch();

  const handleNodeClick = useCallback((nodeData: TreeNodeData) => {
    setSelectedNode(nodeData);
    setExplorationPath((prevPath) => {
      const newPath = [...prevPath];
      const existingIndex = newPath.findIndex(
        (item) => item.name === nodeData.name
      );
      if (existingIndex !== -1) {
        return newPath.slice(0, existingIndex + 1);
      } else {
        const newItem: ExplorationPathItem = {
          name: nodeData.name,
          node: nodeData,
          fullPath: [...prevPath.map((item) => item.name), nodeData.name],
        };
        return [...newPath, newItem];
      }
    });
  }, []);

  const handlePathNavigate = useCallback((index: number) => {
    setExplorationPath((prevPath) => prevPath.slice(0, index + 1));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } =
          treeContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 10 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const resetChart = useCallback(() => {
    if (treeWrapperRef.current) {
      treeWrapperRef.current.setState({
        translate: { x: dimensions.width / 2, y: dimensions.height / 10 },
        zoom: 1,
      });
    }
    setSelectedNode(null);
    setExplorationPath([]);
    setZoom(1);
  }, [dimensions]);

  const expandAllNodes = useCallback(() => {
    const expand = (node: TreeNodeData) => {
      if (node.children) {
        node.children.forEach(expand);
      }
      if (node.__rd3t) {
        node.__rd3t.collapsed = false;
      }
    };
    expand(treeData as TreeNodeData);
    if (treeWrapperRef.current) {
      treeWrapperRef.current.setState({});
    }
  }, []);

  const handleZoom = useCallback((zoomIn: boolean) => {
    setZoom((prevZoom) => {
      const newZoom = zoomIn ? prevZoom * 1.2 : prevZoom / 1.2;
      if (treeWrapperRef.current) {
        treeWrapperRef.current.setState({ zoom: newZoom });
      }
      return newZoom;
    });
  }, []);

  const handleNodeSelect = useCallback((node: TreeNodeData, path: string[]) => {
    setSelectedNode(node);
    const newPath: ExplorationPathItem[] = path.map((name, index) => {
      const foundNode = findNodeByPath(
        treeData as TreeNodeData,
        path.slice(0, index + 1)
      );
      return {
        name,
        node: foundNode || node, // Fallback to the selected node if not found
        fullPath: path.slice(0, index + 1),
      };
    });
    setExplorationPath(newPath);
    if (treeWrapperRef.current && treeWrapperRef.current.zoomToNode) {
      treeWrapperRef.current.zoomToNode(node, 1.5);
    }
  }, []);

  const findNodeByPath = (
    node: TreeNodeData,
    path: string[]
  ): TreeNodeData | null => {
    if (path.length === 0 || node.name !== path[0]) {
      return null;
    }
    if (path.length === 1) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeByPath(child, path.slice(1));
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return (
    <AISettingsProvider>
      <Card className="w-full mx-auto p-4 bg-card">
        <CardHeader>
          {/* <p className="text-center text-muted-foreground mb-6">
            Explore the diversity of life with AI assistance. Click on branches
            to learn more.
          </p> */}
          {/* <SearchBar onNodeSelect={handleNodeSelect} /> Add this line */}
          <AISettings />
        </CardHeader>
        <CardContent>
          <ExplorationPath
            path={explorationPath}
            onNavigate={handleNodeSelect}
          />
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border border-border"
          >
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="h-full flex flex-col">
                <Card className="m-2">
                  <CardContent className="p-2 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => handleZoom(true)}
                              variant="outline"
                              size="icon"
                            >
                              <ZoomIn size={18} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Zoom In</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => handleZoom(false)}
                              variant="outline"
                              size="icon"
                            >
                              <ZoomOut size={18} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Zoom Out</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={resetChart}
                              variant="outline"
                              size="icon"
                            >
                              <RotateCcw size={18} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Reset View</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <SearchBar onNodeSelect={handleNodeSelect} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <ChevronsUpDown size={18} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Expand/Collapse All</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardContent>
                </Card>
                <div
                  ref={treeContainerRef}
                  className="flex-grow bg-background dark:bg-gray-800 rounded-lg overflow-hidden relative m-2"
                >
                  <DynamicTree
                    data={treeData as TreeNodeData}
                    orientation="vertical"
                    pathFunc="step"
                    renderCustomNodeElement={(rd3tProps) => (
                      <CustomNodeRenderer
                        nodeDatum={rd3tProps.nodeDatum as TreeNodeData}
                        toggleNode={rd3tProps.toggleNode}
                        onNodeClick={handleNodeClick}
                      />
                    )}
                    separation={{ siblings: 1.5, nonSiblings: 2 }}
                    transitionDuration={600}
                    zoomable={true}
                    collapsible={true}
                    translate={translate}
                    dimensions={dimensions}
                    nodeSize={{ x: 180, y: 180 }}
                    zoom={zoom}
                    pathClassFunc={() => "tree-link"}
                    onUpdate={(updateArgs) => {
                      console.log("Tree updated:", updateArgs);
                    }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <NodeLegend />
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={30}>
              <div className="h-full p-4">
                <Tabs defaultValue="summary" className="">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      className="font-semibold tracking-tight"
                      value="summary"
                    >
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      className="font-semibold tracking-tight"
                      value="ai"
                    >
                      AI Insights
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    <InfoPanel node={selectedNode} />
                  </TabsContent>
                  <TabsContent value="ai">
                    <AIAssistant
                      onResponse={setAIResponse}
                      node={selectedNode}
                    />
                    {/* <AIChatTest /> */}
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </AISettingsProvider>
  );
};

export default VisualTreeOfLife;
