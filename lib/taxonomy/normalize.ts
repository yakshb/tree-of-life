import type {
  TaxonomicRank,
  TaxonLifecycle,
  TreeNodeAttributes,
  TreeNodeData,
  TreeNodeStatus,
} from "@/types/treeTypes";

type SeedValue = string | number | boolean | undefined;

export interface SeedTreeNode {
  name: string;
  attributes?: Record<string, SeedValue>;
  children?: SeedTreeNode[];
}

const rankOrder: TaxonomicRank[] = [
  "domain",
  "realm",
  "kingdom",
  "clade",
  "phylum",
  "subphylum",
  "class",
  "infraclass",
  "superorder",
  "order",
  "suborder",
  "infraorder",
  "parvorder",
  "superfamily",
  "family",
  "subfamily",
  "tribe",
  "genus",
  "species",
];

const supportedAttributeKeys = new Set<keyof TreeNodeAttributes>([
  "scientificName",
  "description",
  "age",
  "status",
  "taxonomicRank",
  "domain",
  "realm",
  "kingdom",
  "clade",
  "phylum",
  "subphylum",
  "class",
  "infraclass",
  "superorder",
  "order",
  "suborder",
  "infraorder",
  "parvorder",
  "superfamily",
  "family",
  "subfamily",
  "tribe",
  "genus",
  "species",
  "geologicalAge",
]);

function isMeaningful(value: SeedValue): value is string | number | boolean {
  return value !== undefined && value !== "" && value !== "N/A";
}

function slugify(value: string) {
  return (
    value
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "unnamed"
  );
}

function inferLifecycle(status?: TreeNodeStatus): TaxonLifecycle {
  if (!status) return "unknown";
  if (status === "Developing") return "origin";
  if (status === "Non-biological") return "synthetic";
  if (status === "Extinct") return "extinct";
  if (status.includes("Extinct") && status.includes("Living")) return "mixed";
  if (status.includes("Living")) return "extant";
  return "unknown";
}

function inferRank(
  attributes: TreeNodeAttributes,
  depth: number,
): TaxonomicRank {
  if (depth === 0) return "origin";
  if (attributes.status === "Non-biological") return "concept";

  for (const rank of [...rankOrder].reverse()) {
    const value = attributes[rank];
    if (typeof value === "string") return rank;
  }

  return attributes.clade ? "clade" : "unranked";
}

function standardizeAttributes(seedAttributes?: Record<string, SeedValue>) {
  const attributes: TreeNodeAttributes = {};

  for (const [key, value] of Object.entries(seedAttributes ?? {})) {
    if (
      !isMeaningful(value) ||
      !supportedAttributeKeys.has(key as keyof TreeNodeAttributes)
    ) {
      continue;
    }
    Object.assign(attributes, { [key]: value });
  }

  return attributes;
}

function buildLineage(attributes: TreeNodeAttributes) {
  return Object.fromEntries(
    rankOrder.flatMap((rank) => {
      const value = attributes[rank];
      return typeof value === "string" ? [[rank, value]] : [];
    }),
  ) as Partial<Record<TaxonomicRank, string>>;
}

function assessQuality(attributes: TreeNodeAttributes, rank: TaxonomicRank) {
  const flags: string[] = [];
  const checks = [
    Boolean(attributes.scientificName),
    Boolean(attributes.description),
    Boolean(attributes.age),
    Boolean(attributes.geologicalAge),
    rank !== "unranked",
  ];

  if (!attributes.scientificName) flags.push("missing-scientific-name");
  if (!attributes.geologicalAge) flags.push("missing-geological-range");
  if (rank === "unranked") flags.push("rank-needs-review");

  return {
    completeness: Math.round(
      (checks.filter(Boolean).length / checks.length) * 100,
    ),
    flags,
  };
}

export function normalizeTreeData(seed: SeedTreeNode): TreeNodeData {
  function visit(node: SeedTreeNode, path: string[], depth: number): TreeNodeData {
    const attributes = standardizeAttributes(node.attributes);
    const rank = inferRank(attributes, depth);
    attributes.taxonomicRank = rank;
    const lifecycle = inferLifecycle(attributes.status);
    const slug = slugify(attributes.scientificName ?? node.name);
    const id = [...path, slug].join("/");
    const children = (node.children ?? [])
      .filter((child) => child.attributes?.status !== "Non-biological")
      .map((child) => visit(child, [...path, slug], depth + 1));

    return {
      id,
      name: node.name,
      attributes,
      metadata: {
        rank,
        lifecycle,
        lineage: buildLineage(attributes),
        commonNames:
          attributes.scientificName && attributes.scientificName !== node.name
            ? [node.name]
            : [],
        sources: [{ provider: "Curated" }],
        quality: assessQuality(attributes, rank),
        branchType:
          lifecycle === "synthetic"
            ? "synthetic"
            : rank === "origin"
              ? "evolutionary-concept"
              : "biological",
      },
      ...(children.length > 0 ? { children } : {}),
    };
  }

  return visit(seed, [], 0);
}

export function collectSyntheticConcepts(seed: SeedTreeNode) {
  const concepts: SeedTreeNode[] = [];

  function visit(node: SeedTreeNode) {
    if (node.attributes?.status === "Non-biological") {
      concepts.push(node);
      return;
    }
    node.children?.forEach(visit);
  }

  visit(seed);
  return concepts;
}

export interface TreeDataQualityReport {
  nodeCount: number;
  leafCount: number;
  maximumDepth: number;
  averageCompleteness: number;
  rankCoverage: Record<string, number>;
  flaggedNodes: Array<{ id: string; flags: string[] }>;
}

export function auditTreeData(root: TreeNodeData): TreeDataQualityReport {
  const seenIds = new Set<string>();
  const rankCoverage: Record<string, number> = {};
  const flaggedNodes: Array<{ id: string; flags: string[] }> = [];
  let nodeCount = 0;
  let leafCount = 0;
  let maximumDepth = 0;
  let completenessTotal = 0;

  function visit(node: TreeNodeData, depth: number) {
    if (seenIds.has(node.id)) {
      throw new Error(`Duplicate taxon id: ${node.id}`);
    }
    seenIds.add(node.id);

    if (Object.values(node.attributes ?? {}).includes("N/A")) {
      throw new Error(`Placeholder value survived normalization: ${node.id}`);
    }
    if (node.metadata.branchType === "synthetic") {
      throw new Error(`Synthetic concept leaked into the biological tree: ${node.id}`);
    }

    nodeCount += 1;
    maximumDepth = Math.max(maximumDepth, depth);
    completenessTotal += node.metadata.quality.completeness;
    rankCoverage[node.metadata.rank] =
      (rankCoverage[node.metadata.rank] ?? 0) + 1;
    if (!node.children?.length) leafCount += 1;
    if (node.metadata.quality.flags.length > 0) {
      flaggedNodes.push({
        id: node.id,
        flags: node.metadata.quality.flags,
      });
    }

    node.children?.forEach((child) => visit(child, depth + 1));
  }

  visit(root, 0);
  return {
    nodeCount,
    leafCount,
    maximumDepth,
    averageCompleteness: Math.round(completenessTotal / nodeCount),
    rankCoverage,
    flaggedNodes,
  };
}
