import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreeNodeDatum } from 'react-d3-tree';

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
  };
}

interface InfoPanelProps {
  node: TreeNodeData;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="z-50 p-4"
    >
      <Card className="max-w-2xl mx-auto bg-white shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold">{node.name}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{node.attributes?.description}</p>
          {/* Add more details about the node here */}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default InfoPanel;