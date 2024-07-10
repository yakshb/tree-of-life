import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TreeNodeDatum } from 'react-d3-tree';

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
    status?: 'Living' | 'Extinct' | 'Living and Extinct' | 'Developing';
  };
  dynamicWidth?: number;
}

interface CustomNodeProps {
  nodeDatum: TreeNodeData;
  toggleNode: () => void;
  onNodeClick: (nodeData: TreeNodeData) => void;
}

const CustomNodeRenderer: React.FC<CustomNodeProps> = ({ nodeDatum, toggleNode, onNodeClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNode();
    onNodeClick(nodeDatum);
  }, [toggleNode, onNodeClick, nodeDatum]);

  const getNodeColor = useCallback(() => {
    switch (nodeDatum.attributes?.status) {
      case 'Living':
      case 'Living and Extinct':
        return "#48bb78"; // Green
      case 'Extinct':
        return "#DC2626"; // Red
      case 'Developing':
        return "#3B82F6"; // Blue
      default:
        return "#9CA3AF"; // Gray for unknown status
    }
  }, [nodeDatum.attributes?.status]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.g
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: 'pointer' }}
          >
            <motion.circle
              r={15}
              fill={getNodeColor()}
              stroke={isHovered ? "#ffffff" : "transparent"}
              strokeWidth={2}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.text
              dy="0.35em"
              x={20}
              textAnchor="start"
              fontSize={20}
              fill="#333"
              fontWeight={isHovered ? 600 : 500}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {nodeDatum.name}
            </motion.text>
          </motion.g>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{nodeDatum.attributes?.description || "No description available"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomNodeRenderer;