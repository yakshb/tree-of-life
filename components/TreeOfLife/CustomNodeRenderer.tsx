import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TreeNodeDatum } from "react-d3-tree";
import { useTheme } from "next-themes";

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
    status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
  };
  dynamicWidth?: number;
}

interface CustomNodeProps {
  nodeDatum: TreeNodeData;
  toggleNode: () => void;
  onNodeClick: (nodeData: TreeNodeData) => void;
}

const CustomNodeRenderer: React.FC<CustomNodeProps> = ({
  nodeDatum,
  toggleNode,
  onNodeClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleNode();
      onNodeClick(nodeDatum);
    },
    [toggleNode, onNodeClick, nodeDatum]
  );

  const getNodeColor = useCallback(() => {
    const baseColors = {
      Living: {
        light: "hsl(142.1 76.2% 36.3%)",
        dark: "hsl(142.1 70.6% 45.3%)",
      },
      "Living and Extinct": {
        light: "hsl(142.1 76.2% 36.3%)",
        dark: "hsl(142.1 70.6% 45.3%)",
      },
      Extinct: { light: "hsl(0 84.2% 60.2%)", dark: "hsl(0 62.8% 30.6%)" },
      Developing: {
        light: "hsl(217.2 91.2% 59.8%)",
        dark: "hsl(217.2 91.2% 59.8%)",
      },
      Default: { light: "hsl(240 3.8% 46.1%)", dark: "hsl(240 5% 64.9%)" },
    };

    const colorSet =
      baseColors[nodeDatum.attributes?.status as keyof typeof baseColors] ||
      baseColors.Default;
    return theme === "dark" ? colorSet.dark : colorSet.light;
  }, [nodeDatum.attributes?.status, theme]);

  const getTextColor = useCallback(() => {
    return theme === "dark" ? "hsl(0 0% 95%)" : "hsl(240 10% 3.9%)";
  }, [theme]);

  const getHoverColor = useCallback(() => {
    return theme === "dark" ? "hsl(0 0% 100%)" : "hsl(0 0% 0%)";
  }, [theme]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.g
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }}
          >
            <motion.circle
              r={15}
              fill={getNodeColor()}
              stroke={isHovered ? getHoverColor() : "transparent"}
              strokeWidth={2}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.text
              dy="0.35em"
              x={20}
              textAnchor="start"
              fontSize={20}
              fill={getTextColor()}
              fontWeight={isHovered ? 600 : 500}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {nodeDatum.name}
            </motion.text>
          </motion.g>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {nodeDatum.attributes?.description || "No description available"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomNodeRenderer;
