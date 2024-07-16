import React, { useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TreeNodeDatum } from "react-d3-tree";
import { Info } from "lucide-react";
import { useChat } from "ai/react";
import { useChat as useChatContext } from "../ai-interface/ChatContext";
import ReactMarkdown from "react-markdown";
import Spinner from "../ai-interface/Spinner";

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

export const AIAssistant: React.FC<AIAssistantProps> = ({
  onResponse,
  node,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { chatHistory, updateChatHistory } = useChatContext();

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { node },
      initialMessages: node ? chatHistory[node.name] || [] : [],
      onFinish: (message) => {
        onResponse(message.content);
        if (node) {
          updateChatHistory(node.name, messages);
        }
      },
    });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedPrompts = node
    ? [
        `Tell me more about ${node.name}`,
        `What is the evolutionary history of ${node.name}?`,
        `How much DNA do humans share with ${node.name}?`,
        `What are the key characteristics of ${node.name}?`,
        `Show me a realistic depiction of ${node.name}`,
      ]
    : [];

  const handlePromptClick = useCallback(
    (prompt: string) => {
      handleInputChange({
        target: { value: prompt },
      } as React.ChangeEvent<HTMLInputElement>);
    },
    [handleInputChange]
  );

  useEffect(() => {
    if (input.trim() !== "") {
      handleSubmit(new Event("submit") as any);
    }
  }, [input, handleSubmit]);

  if (!node) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[850px] flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6"
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
      <Card className="h-[850px] overflow-hidden bg-gradient-to-br from-background to-emerald-50 shadow-lg">
        <CardContent className="p-6 flex flex-col h-full">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold mb-4 text-emerald-700"
          >
            Ask Your AI Assistant
          </motion.h2>
          <div className="flex flex-col flex-grow w-full bg-white/50 border rounded-md shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                Learn more about {node.name}
              </h2>
            </div>
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.role === "assistant"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-2 rounded-md ${
                      message.role === "assistant"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <ReactMarkdown className="text-md prose">
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-4">
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-md cursor-pointer hover:bg-indigo-100"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2"
              >
                <Input
                  className="flex-grow"
                  value={input}
                  placeholder="Ask about this life form..."
                  onChange={handleInputChange}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Ask AI"}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAssistant;
