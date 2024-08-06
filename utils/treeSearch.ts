import { TreeNodeData } from '@/types/treeTypes';

interface SearchResult {
  node: TreeNodeData;
  path: string[];
}

export function searchTree(node: TreeNodeData, searchTerm: string, currentPath: string[] = []): SearchResult[] {
  let results: SearchResult[] = [];

  // Check if the current node matches the search term
  if (
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.attributes?.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.attributes?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    results.push({ node, path: [...currentPath, node.name] });
  }

  // Recursively search children
  if (node.children) {
    for (const child of node.children) {
      results = results.concat(searchTree(child, searchTerm, [...currentPath, node.name]));
    }
  }

  return results;
}