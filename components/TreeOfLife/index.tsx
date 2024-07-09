"use client";

import React, { useState, useCallback } from "react";
import Tree from "react-d3-tree";
import { AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { treeData } from "../../data/treeData";
import styles from "@/styles/TreeStyles.module.css";
import AIAssistant from "./AIAssistant";
import InfoPanel from "./InfoPanel";
import ExplorationPath from "./ExplorationPath";
import CustomNodeRenderer from "./CustomNodeRenderer";
import { TreeNodeDatum } from "react-d3-tree";
import { ExplorationPathItem } from "@/types/treeTypes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
  };
}

const VisualTreeOfLife: React.FC = () => {
  const [aiResponse, setAIResponse] = useState("");
  const [explorationPath, setExplorationPath] = useState<ExplorationPathItem[]>(
    []
  );
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);

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

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <p className="text-center text-gray-600 mb-6">
          Explore the diversity of life with AI assistance. Click on branches to
          learn more.
        </p>
        <AIAssistant onResponse={setAIResponse} />
      </CardHeader>
      <CardContent>
        {aiResponse && (
          <div className="mb-4 p-3 bg-blue-50 rounded">
            <h3 className="font-semibold">AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}
        <ExplorationPath
          path={explorationPath}
          onNavigate={handlePathNavigate}
        />
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={66}>
            <div
              className={`${styles.treeContainer} bg-gray-50 rounded-lg overflow-hidden`}
            >
              <Tree
                data={treeData}
                orientation="vertical"
                pathFunc="step"
                onNodeClick={handleNodeClick}
                renderCustomNodeElement={(rd3tProps) => (
                  <CustomNodeRenderer
                    nodeDatum={rd3tProps.nodeDatum as TreeNodeData}
                    toggleNode={rd3tProps.toggleNode}
                  />
                )}
                separation={{ siblings: 1, nonSiblings: 1.5 }}
                transitionDuration={600}
                zoomable={true}
                collapsible={true}
                translate={{ x: 400, y: 50 }}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={33}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">One</span>
              <AnimatePresence>
                {selectedNode && (
                  <InfoPanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default VisualTreeOfLife;
