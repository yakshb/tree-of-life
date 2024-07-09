import React from 'react';
import { motion } from 'framer-motion';
import { TreeNodeData } from '@/types/treeTypes';

interface CustomNodeProps {
  nodeDatum: TreeNodeData;
  toggleNode: () => void;
}

const CustomNodeRenderer: React.FC<CustomNodeProps> = ({ nodeDatum, toggleNode }) => (
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

export default CustomNodeRenderer;