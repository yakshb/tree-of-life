import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TreeNodeDatum } from 'react-d3-tree';

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
  };
}

interface InfoPanelProps {
  node: TreeNodeData | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node }) => {
  useEffect(() => {
    console.log("InfoPanel received node:", node);  // Debug log
  }, [node]);

  if (!node) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a node to view details
      </div>
    );
  }

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">{node.name}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{node.attributes?.description || "No description available"}</p>
        {/* Add more details about the node here if needed */}
      </CardContent>
    </Card>
  );
};

export default InfoPanel;