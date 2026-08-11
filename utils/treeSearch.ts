import type { TreeNodeData } from "@/types/treeTypes";

interface SearchResult {
  node: TreeNodeData;
  path: string[];
}

interface ScoredSearchResult extends SearchResult {
  score: number;
}

const taxonomyKeys = [
  "domain",
  "kingdom",
  "phylum",
  "subphylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
] as const;

function scoreNode(node: TreeNodeData, query: string) {
  const name = node.name.toLowerCase();
  const scientificName = node.attributes?.scientificName?.toLowerCase() ?? "";
  const description = node.attributes?.description?.toLowerCase() ?? "";
  const taxonomy = taxonomyKeys.flatMap((key) => {
    const value = node.attributes?.[key];
    return value ? [value.toLowerCase()] : [];
  });

  if (name === query) return 120;
  if (scientificName === query) return 115;
  if (name.startsWith(query)) return 100;
  if (scientificName.startsWith(query)) return 95;
  if (name.includes(query)) return 85;
  if (scientificName.includes(query)) return 80;
  if (taxonomy.some((value) => value === query)) return 70;
  if (taxonomy.some((value) => value.includes(query))) return 60;

  const descriptionIndex = description.indexOf(query);
  if (descriptionIndex >= 0) {
    return Math.max(12, 40 - Math.floor(descriptionIndex / 12));
  }
  return 0;
}

export function searchTree(node: TreeNodeData, searchTerm: string): SearchResult[] {
  const query = searchTerm.trim().toLowerCase();
  if (!node || !query) return [];

  const results: ScoredSearchResult[] = [];

  function visit(current: TreeNodeData, currentPath: string[]) {
    const path = [...currentPath, current.name];
    const score = scoreNode(current, query);
    if (score > 0) results.push({ node: current, path, score });
    for (const child of current.children ?? []) visit(child, path);
  }

  visit(node, []);
  return results
    .sort((left, right) => right.score - left.score || left.path.length - right.path.length)
    .slice(0, 12)
    .map(({ node: resultNode, path }) => ({ node: resultNode, path }));
}
