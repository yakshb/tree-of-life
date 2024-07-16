import React from 'react';

const NodeLegend: React.FC = () => {
  const legendItems = [
    { status: 'Living', color: 'hsl(142.1 76.2% 36.3%)' },
    { status: 'Extinct', color: 'hsl(0 84.2% 60.2%)' },
    { status: 'Living and Extinct', color: 'hsl(142.1 76.2% 36.3%)' },
    { status: 'Developing', color: 'hsl(217.2 91.2% 59.8%)' },
    { status: 'Unknown', color: 'hsl(240 3.8% 46.1%)' },
  ];

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-foreground">Node Status Legend</h3>
      <div className="flex flex-wrap gap-4">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeLegend;