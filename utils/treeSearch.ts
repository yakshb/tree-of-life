import { TreeNodeData } from '@/types/treeTypes';

interface SearchResult {
  node: TreeNodeData;
  path: TreeNodeData[];
}

export function searchTree(node: TreeNodeData, searchTerm: string): SearchResult[] {
  const results: SearchResult[] = [];
  const searchTermLower = searchTerm.toLowerCase();

  function search(currentNode: TreeNodeData, currentPath: TreeNodeData[]) {
    if (currentNode.name.toLowerCase().includes(searchTermLower) ||
        currentNode.attributes?.description?.toLowerCase().includes(searchTermLower)) {
      results.push({ node: currentNode, path: [...currentPath, currentNode] });
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        search(child as TreeNodeData, [...currentPath, currentNode]);
      }
    }
  }

  search(node, []);
  return results;
}