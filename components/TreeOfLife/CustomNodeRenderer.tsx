import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TreeNodeDatum } from 'react-d3-tree';

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
  };
}

interface CustomNodeProps {
  nodeDatum: TreeNodeData;
  toggleNode: () => void;
  onNodeClick: (nodeData: TreeNodeData) => void;
}

const CustomNodeRenderer: React.FC<CustomNodeProps> = ({ nodeDatum, toggleNode, onNodeClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNode();
    onNodeClick(nodeDatum);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
          >
            <circle
              r={10}
              fill={nodeDatum.children ? "#4299e1" : "#48bb78"}
            />
            <text dy="0.35em" x={16} textAnchor="start" fontSize={12} fill="#333">
              {nodeDatum.name}
            </text>
          </motion.g>
        </TooltipTrigger>
        <TooltipContent>
          <p>{nodeDatum.attributes?.description || "No description available"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomNodeRenderer;