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
import AIAssistant from "./AIAssistant";
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
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DynamicTree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

interface TreeNodeData extends TreeNodeDatum {
  children: TreeNodeData[];
  attributes?: {
    description?: string;
    status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
  };
  dynamicWidth?: number;
}

const VisualTreeOfLife: React.FC = () => {
  const [aiResponse, setAIResponse] = useState("");
  const [explorationPath, setExplorationPath] = useState<ExplorationPathItem[]>(
    []
  );
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const calculateDynamicWidth = useCallback((node: TreeNodeData): number => {
    const baseWidth = 100; // Base width for each node
    const textWidth = node.name.length * 8; // Approximate width of text
    const childrenWidth = node.children
      ? node.children.reduce(
          (sum, child) => sum + calculateDynamicWidth(child),
          0
        )
      : 0;
    return Math.max(baseWidth, textWidth, childrenWidth);
  }, []);

  const processedTreeData = useMemo(() => {
    const processNode = (node: TreeNodeData): TreeNodeData => {
      return {
        ...node,
        children: node.children ? node.children.map(processNode) : [],
        dynamicWidth: calculateDynamicWidth(node),
      };
    };
    return processNode(treeData as TreeNodeData);
  }, [calculateDynamicWidth]);

  const handleNodeClick = useCallback((nodeData: TreeNodeData) => {
    console.log("Node clicked:", nodeData);
    setSelectedNode(nodeData);
    setExplorationPath((prevPath) => {
      const newPath = [...prevPath];
      const existingIndex = newPath.findIndex(
        (item) => item.name === nodeData.name
      );
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

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <p className="text-center text-gray-600 mb-6">
          Explore the diversity of life with AI assistance. Click on branches to
          learn more.
        </p>
      </CardHeader>
      <CardContent>
        <ExplorationPath
          path={explorationPath}
          onNavigate={handlePathNavigate}
        />
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={70}>
            <div
              ref={treeContainerRef}
              className={`${styles.treeContainer} bg-gray-50 rounded-lg overflow-hidden`}
              style={{ height: "700px" }}
            >
              <DynamicTree
                data={processedTreeData}
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
                  <AIAssistant onResponse={setAIResponse} />
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
