import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AIAssistantProps {
  onResponse: (response: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onResponse }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = `Here's what I found about "${query}": [AI-generated content would go here]`;
    onResponse(response);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about any life form..."
          className="flex-grow"
        />
        <Button type="submit">Ask AI</Button>
      </div>
    </form>
  );
};

export default AIAssistant;