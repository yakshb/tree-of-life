import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TreeNodeDatum } from 'react-d3-tree';
import { Info, NotebookPen, Calendar, Lightbulb } from 'lucide-react';

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
    age?: string;
    status?: string;
  };
}

interface InfoPanelProps {
  node: TreeNodeData | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node }) => {
  if (!node) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6"
      >
        <Info className="w-16 h-16 mb-4 text-indigo-400" />
        <p className="text-lg font-semibold text-center">Select a node to view details</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-auto bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
        <CardContent className="p-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-6 text-indigo-700 border-b pb-2"
          >
            {node.name}
          </motion.h2>
          <div className="space-y-6">
            <InfoItem
              icon={<NotebookPen className="text-indigo-500" />}
              title="Description"
              content={node.attributes?.description || "No description available"}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2 md:space-x-4'>
            <InfoItem
              icon={<Calendar className="text-indigo-500" />}
              title="Age"
              content={node.attributes?.age || "Age not specified"}
            />
            {node.attributes?.status && (
              <InfoItem
                icon={<Lightbulb className="text-indigo-500" />}
                title="Status"
                content={node.attributes.status}
              />
              
            )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; title: string; content: string }> = ({ icon, title, content }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="flex items-start bg-white bg-opacity-50 rounded-lg p-4 shadow-sm"
  >
    <div className="mr-4 mt-1">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  </motion.div>
);

export default InfoPanel;