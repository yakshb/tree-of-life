import { useState, useEffect } from 'react';
import { TreeNodeData } from '../types/treeTypes';

export const useSuggestedPrompts = (node: TreeNodeData | null, chatHistory: any[]) => {
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generatePrompts = async () => {
      if (!node) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/generate-prompts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ node, chatHistory }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch suggested prompts');
        }
        const data = await response.json();
        setSuggestedPrompts(data.suggestedPrompts);
      } catch (error) {
        console.error('Error fetching suggested prompts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generatePrompts();
  }, [node, chatHistory]);

  return { suggestedPrompts, isLoading };
};