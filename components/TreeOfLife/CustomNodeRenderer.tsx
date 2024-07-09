import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TreeNodeDatum } from 'react-d3-tree';

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
    status?: 'Living' | 'Extinct' | 'Living and Extinct' | 'Developing';
  };
}

interface CustomNodeProps {
  nodeDatum: TreeNodeData;
  toggleNode: () => void;
  onNodeClick: (nodeData: TreeNodeData) => void;
}

const CustomNodeRenderer: React.FC<CustomNodeProps> = ({ nodeDatum, toggleNode, onNodeClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNode();
    onNodeClick(nodeDatum);
    setIsClicked(prevState => !prevState);
  }, [toggleNode, onNodeClick, nodeDatum]);

  const getNodeColor = useCallback(() => {
    if (isClicked) {
      return "#FFA500"; // Orange color for clicked nodes
    }
    switch (nodeDatum.attributes?.status) {
      case 'Living':
      case 'Living and Extinct':
        return "#48bb78"; // Green
      case 'Extinct':
        return "#DC2626"; // Red (changed from #7C0A02 for better visibility)
      case 'Developing':
        return "#3B82F6"; // Blue
      default:
        return "#9CA3AF"; // Gray for unknown status
    }
  }, [isClicked, nodeDatum.attributes?.status]);

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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: 'pointer' }}
          >
            <motion.circle
              r={20}
              fill={getNodeColor()}
              stroke={isHovered ? "#ffffff" : "transparent"}
              strokeWidth={1}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.text
              dy="0.35em"
              x={30}
              textAnchor="start"
              fontSize={12}
              fill="#333"
              fontWeight={500}
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