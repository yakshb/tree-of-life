import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTheme } from "next-themes";
import type { TreeNodeData } from "@/types/treeTypes";

function truncateLabel(value: string, maximumLength: number) {
  return value.length > maximumLength
    ? `${value.slice(0, maximumLength - 1)}…`
    : value;
}

interface CustomNodeProps {
  nodeDatum: TreeNodeData;
  toggleNode: () => void;
  onNodeClick: (nodeData: TreeNodeData) => void;
  isSelected?: boolean;
}

const CustomNodeRenderer: React.FC<CustomNodeProps> = ({
  nodeDatum,
  toggleNode,
  onNodeClick,
  isSelected = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();

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

    const status = nodeDatum.attributes?.status;
    const colorSet =
      status === "Living" || status === "Living (as modern birds)"
        ? baseColors.Living
        : status === "Extinct"
          ? baseColors.Extinct
          : status?.includes("Living") && status?.includes("Extinct")
            ? baseColors["Living and Extinct"]
            : status === "Developing" || status === "Non-biological"
              ? baseColors.Developing
              : baseColors.Default;
    return resolvedTheme === "dark" ? colorSet.dark : colorSet.light;
  }, [nodeDatum.attributes?.status, resolvedTheme]);

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
    return getNodeSize + 7;
  }, [getNodeSize]);

  const label = useMemo(() => {
    const name = truncateLabel(nodeDatum.name, 27);
    const scientificName = nodeDatum.attributes?.scientificName?.trim();
    const showScientificName = Boolean(
      scientificName &&
        scientificName.toLowerCase() !== nodeDatum.name.toLowerCase() &&
        scientificName.toLowerCase() !== "n/a",
    );
    const scientific = showScientificName
      ? truncateLabel(scientificName ?? "", 29)
      : "";
    const width = Math.max(name.length * 7.5, scientific.length * 6.2) + 20;

    return {
      name,
      scientific,
      width,
      height: showScientificName ? 39 : 27,
    };
  }, [nodeDatum.attributes?.scientificName, nodeDatum.name]);

  const isDark = resolvedTheme === "dark";

  return (
    <HoverCard openDelay={180} closeDelay={80}>
      <HoverCardTrigger asChild>
        <motion.g
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer" }}
        >
          {isSelected && (
            <motion.circle
              r={getNodeSize + 11}
              fill="none"
              stroke={getNodeColor()}
              strokeWidth={3}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0.75, 0.25, 0.75], scale: [0.95, 1.12, 0.95] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.circle
            r={getNodeSize}
            fill={getNodeColor()}
            stroke={isSelected ? "#ffffff" : isHovered ? getNodeColor() : "transparent"}
            strokeWidth={isSelected ? 4 : 3}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.14 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{ filter: `drop-shadow(0 5px 8px ${getNodeColor()}55)` }}
          />
          <circle
            r={Math.max(4, getNodeSize * 0.25)}
            fill={isDark ? "#07110d" : "#ffffff"}
            opacity={0.9}
          />
          <motion.rect
            x={getTextOffset + 2}
            y={-13.5}
            width={label.width}
            height={label.height}
            rx={8}
            fill={isDark ? "#07110d" : "#ffffff"}
            fillOpacity={isDark ? 0.9 : 0.78}
            stroke={isSelected || isHovered ? getNodeColor() : isDark ? "#334139" : "#d7ded9"}
            strokeOpacity={isSelected || isHovered ? 0.72 : 0.55}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
          />
          <motion.text
            dy="0.35em"
            x={getTextOffset + 11}
            textAnchor="start"
            fontSize={13.5}
            fill={isDark ? "#f4f7f5" : "#17211a"}
            fontWeight={isHovered || isSelected ? 650 : 600}
            letterSpacing="0.01em"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            style={{ pointerEvents: "none", stroke: "none", strokeWidth: 0 }}
          >
            {label.name}
          </motion.text>
          {label.scientific && (
            <motion.text
              dy="1.72em"
              x={getTextOffset + 11}
              textAnchor="start"
              fontSize={11.5}
              fill={isDark ? "#b8c4bd" : "#526057"}
              fontWeight={450}
              fontStyle="italic"
              opacity={1}
              style={{ pointerEvents: "none", stroke: "none", strokeWidth: 0 }}
            >
              {label.scientific}
            </motion.text>
          )}
        </motion.g>
      </HoverCardTrigger>
      <HoverCardContent className="z-50 w-80 rounded-2xl border-border/70 p-4 shadow-xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{nodeDatum.name}</h3>
            {nodeDatum.attributes?.scientificName && (
              <p className="text-sm italic text-muted-foreground">
                {nodeDatum.attributes.scientificName}
              </p>
            )}
          </div>
          <span
            className="mt-1 h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: getNodeColor() }}
          />
        </div>
        <p className="line-clamp-4 text-sm leading-6 text-foreground/80">
          {nodeDatum.attributes?.description || "No description available"}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-1 capitalize">
            {nodeDatum.attributes?.taxonomicRank || "Unknown rank"}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1">
            {nodeDatum.children?.length || 0} direct branches
          </span>
        </div>
        <p className="mt-3 text-xs font-medium text-primary">
          Click to open details{nodeDatum.children?.length ? " and toggle branch" : ""}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomNodeRenderer;
