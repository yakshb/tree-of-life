import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TreeNodeDatum } from "react-d3-tree";
import { Info } from "lucide-react";

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    scientificName?: string;
    description?: string;
    age?: string;
    status?: string;
    domain?: string;
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
    geologicalAge?: string;
  };
}

interface AIAssistantProps {
  onResponse: (response: string) => void;
  node: TreeNodeData | null;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onResponse, node }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai', message: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { type: 'user', message: query }]);

    try {
      // Replace this with your actual API call
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, node }),
      });
      const data = await response.json();
      onResponse(data.response);
      setChatHistory(prev => [...prev, { type: 'ai', message: data.response }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      onResponse(errorMessage);
      setChatHistory(prev => [...prev, { type: 'ai', message: errorMessage }]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  if (!node) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[750px] flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6"
      >
        <Info className="w-16 h-16 mb-4 text-indigo-400" />
        <p className="text-lg font-semibold text-center">
          Select a node to view details and chat with AI
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-[750px] overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
        <CardContent className="p-6 flex flex-col h-full">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold mb-4 text-indigo-700"
          >
            {node.name}
          </motion.h2>
          <div className="flex flex-col flex-grow w-full bg-white border rounded-md shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">AI Chat</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex items-start space-x-2 ${chat.type === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  {chat.type === 'ai' && (
                    <Avatar>
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`p-2 rounded-md ${chat.type === 'ai' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <p className="text-sm">{chat.message}</p>
                  </div>
                  {chat.type === 'user' && (
                    <Avatar>
                      <AvatarImage src="/user-avatar.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Ask about this life form..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Thinking..." : "Ask AI"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ask the AI about {node.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAssistant;