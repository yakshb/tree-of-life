import React from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NodeLegend: React.FC = () => {
  const { theme } = useTheme();

  const legendItems = [
    { status: 'Living', color: theme === 'dark' ? '#4ade80' : '#22c55e' },
    { status: 'Extinct', color: theme === 'dark' ? '#f87171' : '#ef4444' },
    { status: 'Living and Extinct', color: theme === 'dark' ? '#facc15' : '#eab308' },
    { status: 'Developing', color: theme === 'dark' ? '#60a5fa' : '#3b82f6' },
    { status: 'Unknown', color: theme === 'dark' ? '#9ca3af' : '#6b7280' },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Node Status Legend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {legendItems.map((item) => (
            <div key={item.status} className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="w-3 h-3 p-0 rounded-full"
                style={{ backgroundColor: item.color, borderColor: item.color }}
              />
              <span className="text-sm">{item.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeLegend;