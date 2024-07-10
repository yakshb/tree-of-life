"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { treeData } from "../../data/treeData";
import styles from "@/styles/TreeStyles.module.css";
import AIAssistant from "./AIAssistant";
import InfoPanel from "./InfoPanel";
import ExplorationPath from "./ExplorationPath";
import CustomNodeRenderer from "./CustomNodeRenderer";
import { TreeNodeDatum, Point } from "react-d3-tree";
import { ExplorationPathItem } from "@/types/treeTypes";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";

const DynamicTree = dynamic(() => import("react-d3-tree"), { ssr: false });

interface TreeNodeData extends TreeNodeDatum {
  children?: TreeNodeData[];
  attributes?: {
    description?: string;
    status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
  };
}

const VisualTreeOfLife: React.FC = () => {
  const [aiResponse, setAIResponse] = useState("");
  const [explorationPath, setExplorationPath] = useState<ExplorationPathItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const treeWrapperRef = useRef<any>(null);

  const handleNodeClick = useCallback((nodeData: TreeNodeData) => {
    setSelectedNode(nodeData);
    setExplorationPath((prevPath) => {
      const newPath = [...prevPath];
      const existingIndex = newPath.findIndex((item) => item.name === nodeData.name);
      if (existingIndex !== -1) {
        return newPath.slice(0, existingIndex + 1);
      } else {
        return [
          ...newPath,
          {
            name: nodeData.name,
            description: nodeData.attributes?.description,
          },
        ];
      }
    });
  }, []);

  const handlePathNavigate = useCallback((index: number) => {
    setExplorationPath((prevPath) => prevPath.slice(0, index + 1));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } = treeContainerRef.current.getBoundingClientRect();
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
      if (node.__rd3t && node.__rd3t.collapsed !== undefined) {
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

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <p className="text-center text-gray-600 mb-6">
          Explore the diversity of life with AI assistance. Click on branches to learn more.
        </p>
      </CardHeader>
      <CardContent>
        <ExplorationPath path={explorationPath} onNavigate={handlePathNavigate} />
        <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
          <ResizablePanel defaultSize={70}>
            <div className="p-2 flex justify-between bg-gray-100 rounded-t-lg">
              <div>
                <Button onClick={() => handleZoom(true)} variant="outline" size="sm" className="mr-2">
                  <ZoomIn size={18} />
                </Button>
                <Button onClick={() => handleZoom(false)} variant="outline" size="sm" className="mr-2">
                  <ZoomOut size={18} />
                </Button>
              </div>
              <div>
                <Button onClick={expandAllNodes} variant="outline" size="sm" className="mr-2">
                  <Maximize size={18} />
                </Button>
                <Button onClick={resetChart} variant="outline" size="sm">
                  <RotateCcw size={18} />
                </Button>
              </div>
            </div>
            <div
              ref={treeContainerRef}
              className={`${styles.treeContainer} bg-gray-50 rounded-b-lg overflow-hidden`}
              style={{ height: "calc(100% - 40px)" }}
            >
              <DynamicTree
                ref={treeWrapperRef}
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
                nodeSize={{ x: 180, y: 100 }}
                zoom={zoom}
                onUpdate={(updateArgs) => {
                  console.log("Tree updated:", updateArgs);
                }}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={30}>
            <div className="h-full p-4">
              <Tabs defaultValue="summary" className="">
                <TabsList>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="ai">AI Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">
                  <InfoPanel node={selectedNode} />
                </TabsContent>
                <TabsContent value="ai">
                  <AIAssistant onResponse={setAIResponse} node={selectedNode} />
                  {aiResponse && (
                    <div className="mb-4 p-3 bg-blue-50 rounded">
                      <h3 className="font-semibold">AI Response:</h3>
                      <p>{aiResponse}</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default VisualTreeOfLife;