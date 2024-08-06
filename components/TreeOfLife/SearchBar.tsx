import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTreeSearch } from '@/hooks/useTreeSearch';
import { TreeNodeData } from '@/types/treeTypes';

interface SearchBarProps {
  onNodeSelect: (node: TreeNodeData, path: string[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onNodeSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, performSearch } = useTreeSearch();

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      onNodeSelect(searchResults[0].node, searchResults[0].path);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Tree of Life..."
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </div>
      {searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-background border border-input rounded-md shadow-md mt-1 max-h-60 overflow-auto">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="p-2 hover:bg-accent cursor-pointer"
              onClick={() => onNodeSelect(result.node, result.path)}
            >
              <div className="font-medium">{result.node.name}</div>
              {result.node.attributes?.description && (
                <div className="text-sm text-muted-foreground truncate">
                  {result.node.attributes.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};