import React, { useEffect, useRef } from 'react';
import { TreeNodeDatum } from 'react-d3-tree';

interface MinimapProps {
  data: TreeNodeDatum;
  currentViewport: { x: number; y: number; width: number; height: number };
  onViewportChange: (newViewport: { x: number; y: number }) => void;
}

const Minimap: React.FC<MinimapProps> = ({ data, currentViewport, onViewportChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 150, 150);
        drawTree(ctx, data, 75, 10, 140);
        drawViewport(ctx, currentViewport);
      }
    }
  }, [data, currentViewport]);

  const drawTree = (ctx: CanvasRenderingContext2D, node: TreeNodeDatum, x: number, y: number, width: number) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, y, 2, 2);
    if (node.children) {
      const childWidth = width / node.children.length;
      node.children.forEach((child, index) => {
        const childX = x + index * childWidth;
        const childY = y + 15;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(childX, childY);
        ctx.stroke();
        drawTree(ctx, child, childX, childY, childWidth);
      });
    }
  };

  const drawViewport = (ctx: CanvasRenderingContext2D, viewport: { x: number; y: number; width: number; height: number }) => {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(viewport.x, viewport.y, viewport.width, viewport.height);
  };

  const handleMinimapClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onViewportChange({ x, y });
  };

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={150}
      onClick={handleMinimapClick}
      style={{ position: 'absolute', bottom: 10, right: 10, border: '1px solid #ccc' }}
    />
  );
};

export default Minimap;