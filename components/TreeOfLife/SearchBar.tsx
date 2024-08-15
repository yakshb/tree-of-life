import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTreeSearch } from "@/hooks/useTreeSearch";
import { TreeNodeData } from "@/types/treeTypes";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onNodeSelect: (node: TreeNodeData, path: string[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onNodeSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { searchResults, performSearch } = useTreeSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      performSearch(searchTerm);
      setIsOpen(searchTerm.length > 0);
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      onNodeSelect(searchResults[0].node, searchResults[0].path);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative px-2 flex-grow">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Tree of Life..."
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <ArrowRight size={18} />
        </Button>
      </form>
      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full bg-background border border-input rounded-md shadow-md mt-1 max-h-60 overflow-auto"
          >
            {searchResults.map((result, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
                className="p-2 hover:bg-accent cursor-pointer transition-colors duration-150"
                onClick={() => {
                  onNodeSelect(result.node, result.path);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                <div className="font-medium">{result.node.name}</div>
                {result.node.attributes?.description && (
                  <div className="text-sm text-muted-foreground truncate">
                    {result.node.attributes.description}
                  </div>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
