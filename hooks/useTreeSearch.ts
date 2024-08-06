import { useState, useCallback } from 'react';
import { searchTree } from '@/utils/treeSearch';
import { treeData } from '@/data/treeData';
import { TreeNodeData } from '@/types/treeTypes';

interface SearchResult {
  node: TreeNodeData;
  path: string[];
}

export function useTreeSearch() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback((searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const results = searchTree(treeData as TreeNodeData, searchTerm);
      setSearchResults(results || []);
    } catch (error) {
      console.error('Error in tree search:', error);
      setSearchResults([]);
    }
  }, []);

  return { searchResults, performSearch };
}