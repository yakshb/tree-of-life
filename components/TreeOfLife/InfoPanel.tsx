import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TreeNodeData } from '@/types/treeTypes';

interface InfoPanelProps {
  node: TreeNodeData;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node, onClose }) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-50"
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
  </motion.div>
);

export default InfoPanel;