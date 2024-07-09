import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AIAssistantProps {
  onResponse: (response: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onResponse }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      onResponse(data.response);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      onResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  return (

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask about any life form..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Ask AI"}
          </Button>
        </form>
  );
};

export default AIAssistant;