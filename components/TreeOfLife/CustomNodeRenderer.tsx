import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TreeNodeDatum } from "react-d3-tree";
import { useTheme } from "next-themes";

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    description?: string;
    status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
    taxonomicRank?: string;
    scientificName?: string;
  };
  children?: TreeNodeData[];
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
      Living: { light: "#22c55e", dark: "#4ade80" },
      "Living and Extinct": { light: "#eab358", dark: "#facc15" },
      Extinct: { light: "#ef4444", dark: "#f87171" },
      Developing: { light: "#3b82f6", dark: "#60a5fa" },
      Default: { light: "#6b7280", dark: "#9ca3af" },
    };

    const colorSet =
      baseColors[nodeDatum.attributes?.status as keyof typeof baseColors] ||
      baseColors.Default;
    return theme === "dark" ? colorSet.dark : colorSet.light;
  }, [nodeDatum.attributes?.status, theme]);

  const getTextColor = useCallback(() => {
    return theme === "dark" ? "#f3f4f6" : "#1f2937";
  }, [theme]);

  const getHoverColor = useCallback(() => {
    return theme === "dark" ? "#f3f4f6" : "#1f2937";
  }, [theme]);

  const getNodeSize = useMemo(() => {
    const baseSize = 15;
    const childrenCount = nodeDatum.children?.length || 0;
    const rankMultiplier = {
      kingdom: 2.5,
      phylum: 2.2,
      class: 2,
      order: 1.8,
      family: 1.5,
      genus: 1.2,
      species: 1,
    };
    const sizeMultiplier =
      rankMultiplier[
        nodeDatum.attributes?.taxonomicRank as keyof typeof rankMultiplier
      ] || 1;
    return baseSize * sizeMultiplier + Math.min(childrenCount, 10);
  }, [nodeDatum]);

  const getTextOffset = useMemo(() => {
    return getNodeSize + 5;
  }, [getNodeSize]);

  return (
    <HoverCard>
      <motion.g
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: "pointer" }}
      >
        <motion.circle
          r={getNodeSize}
          fill={getNodeColor()}
          stroke={isHovered ? getHoverColor() : "transparent"}
          strokeWidth={2}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.text
          dy="0.35em"
          x={getTextOffset}
          textAnchor="start"
          fontSize={14}
          fill={getTextColor()}
          fontWeight={isHovered ? 600 : 500}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {nodeDatum.name}
        </motion.text>
        {nodeDatum.attributes?.scientificName && (
          <motion.text
            dy="1.7em"
            x={getTextOffset}
            textAnchor="start"
            fontSize={12}
            fill={getTextColor()}
            fontStyle="italic"
            opacity={0.7}
          >
            {nodeDatum.attributes.scientificName}
          </motion.text>
        )}
      </motion.g>
      {/* <HoverCardTrigger asChild>
          {isHovered}
      </HoverCardTrigger> */}
      <HoverCardContent className="z-50 w-80">
        <h3 className="text-lg font-semibold">{nodeDatum.name}</h3>
        {nodeDatum.attributes?.scientificName && (
          <p className="text-sm italic">
            {nodeDatum.attributes.scientificName}
          </p>
        )}
        <p className="text-sm mt-2">
          {nodeDatum.attributes?.description || "No description available"}
        </p>
        <div className="mt-2 flex justify-between text-xs">
          <span>Rank: {nodeDatum.attributes?.taxonomicRank || "Unknown"}</span>
          <span>Status: {nodeDatum.attributes?.status || "Unknown"}</span>
        </div>
        <p className="text-xs mt-1">
          Children: {nodeDatum.children?.length || 0}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomNodeRenderer;
