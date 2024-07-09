"use client";

import React, { useState, useCallback } from "react";
import Tree from "react-d3-tree";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, X } from "lucide-react";
import { treeData } from "../data/treeData";
import styles from "../styles/TreeStyles.module.css";

interface TreeNodeData {
  name: string;
  description?: string;
  children?: (TreeNodeData | string)[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  isRoot?: boolean;
  onNodeClick: (node: TreeNodeData) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  isRoot = false,
  onNodeClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(isRoot);
  const [showDescription, setShowDescription] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onNodeClick(node);
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  return (
    <div className={`tree-node ${isRoot ? "root" : ""}`}>
      <div
        className={`node-content p-2 rounded cursor-pointer ${
          isExpanded ? "bg-blue-100" : "hover:bg-gray-100"
        }`}
        onClick={toggleExpand}
      >
        <div className="font-semibold">{node.name}</div>
        {node.description && (
          <button
            className="text-sm text-blue-500 hover:text-blue-700 mt-1"
            onClick={toggleDescription}
          >
            {showDescription ? "Hide Info" : "Show Info"}
          </button>
        )}
      </div>
      {showDescription && node.description && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
          {node.description}
        </div>
      )}
      {isExpanded && node.children && (
        <div
          className={`children-container ${
            isRoot ? "flex space-x-4 mt-4" : "ml-4 mt-2"
          }`}
        >
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={typeof child === "string" ? { name: child } : child}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};


interface BreadcrumbTrailProps {
  path: string[];
  onNavigate: (index: number) => void;
}

// const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({
//   path,
//   onNavigate,
// }) => {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         {path.map((item, index) => (
//           <React.Fragment key={index}>
//             {index > 0 && (
//               <BreadcrumbSeparator>
//                 <ChevronRight className="h-4 w-4" />
//               </BreadcrumbSeparator>
//             )}
//             <BreadcrumbItem>
//               {index === path.length - 1 ? (
//                 <BreadcrumbPage>{item}</BreadcrumbPage>
//               ) : (
//                 <BreadcrumbLink onClick={() => onNavigate(index)}>
//                   {item}
//                 </BreadcrumbLink>
//               )}
//             </BreadcrumbItem>
//           </React.Fragment>
//         ))}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

interface AIAssistantProps {
  onResponse: (response: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onResponse }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = `Here's what I found about "${query}": [AI-generated content would go here]`;
    onResponse(response);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          placeholder="Ask about any life form..."
          className="flex-grow"
        />
        <Button type="submit">Ask AI</Button>
      </div>
    </form>
  );
};

interface NodeData {
    name: string;
    attributes?: {
      description?: string;
    };
  }

  interface ExplorationPathItem {
    name: string;
    description?: string;
  }

  const customNodeRenderer = ({ nodeDatum, toggleNode }) => (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <circle
        r={10}
        fill={nodeDatum.children ? "#4299e1" : "#48bb78"}
        onClick={toggleNode}
      />
      <text dy="0.35em" x={15} textAnchor="start" fontSize={12} fill="#333">
        {nodeDatum.name}
      </text>
    </motion.g>
  );

  const InfoPanel = ({ node, onClose }) => (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto"
    >
      <Button
        onClick={onClose}
        className="absolute top-2 right-2"
        variant="ghost"
        size="sm"
      >
        <X size={20} />
      </Button>
      <h3 className="text-xl font-semibold mb-2">{node.name}</h3>
      <p className="text-gray-600">{node.attributes?.description || "No description available."}</p>
      {/* Add more details here if needed */}
    </motion.div>
  );

  const VisualTreeOfLife = () => {
    const [aiResponse, setAIResponse] = useState("");
    const [explorationPath, setExplorationPath] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
  
    const handleNodeClick = useCallback((nodeData) => {
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
  
    return (
      <Card className="w-full mx-auto p-4">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center mb-4">
            AI-Interactive Tree of Life Explorer
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Explore the diversity of life with AI assistance. Click on branches to
            learn more.
          </p>
          <AIAssistant onResponse={setAIResponse} />
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h3 className="font-semibold mb-2">Your Exploration Path:</h3>
            <div className="flex flex-wrap items-center">
              {explorationPath.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <ChevronRight className="mx-1 text-gray-400" size={16} />
                  )}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {item.name}
                  </motion.span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
          <div
            style={{ width: "100%", height: "60vh" }}
            className="bg-gray-50 rounded-lg overflow-hidden"
          >
            <Tree
              data={treeData}
              orientation="vertical"
              pathFunc="step"
              onNodeClick={handleNodeClick}
              renderCustomNodeElement={customNodeRenderer}
              separation={{ siblings: 1, nonSiblings: 1.5 }}
              transitionDuration={500}
              zoomable={true}
              collapsible={true}
              translate={{ x: 400, y: 50 }}
            />
          </div>
        </CardContent>
        <AnimatePresence>
          {selectedNode && (
            <InfoPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </AnimatePresence>
      </Card>
    );
  };
  
  export default VisualTreeOfLife;
