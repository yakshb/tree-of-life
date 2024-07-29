import React from 'react';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SuggestedPromptsProps {
  prompts: string[];
  isLoading: boolean;
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, isLoading, onPromptClick }) => {
  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading suggested questions...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2"
    >
      {prompts.map((prompt, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="text-md cursor-pointer hover:bg-indigo-100"
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </Badge>
      ))}
    </motion.div>
  );
};

export default SuggestedPrompts;