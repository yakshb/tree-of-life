import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ExplorationPathItem, TreeNodeData } from '@/types/treeTypes';

interface ExplorationPathProps {
  path: ExplorationPathItem[];
  onNavigate: (node: TreeNodeData, path: string[]) => void;
}

const ExplorationPath: React.FC<ExplorationPathProps> = ({ path, onNavigate }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-4"
  >
    <h3 className="font-semibold mb-2">Your Exploration Path:</h3>
    <div className="flex flex-wrap items-center">
      {path.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="mx-1 text-gray-400" size={16} />
          )}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-green-800 dark:text-green-200 hover:underline cursor-pointer"
            onClick={() => onNavigate(item.node, item.fullPath)}
          >
            {item.name}
          </motion.span>
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

export default ExplorationPath;