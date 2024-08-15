import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { TreeNodeDatum } from "react-d3-tree";
import { Info, Send } from "lucide-react";
import { useChat } from "ai/react";
import { useChat as useChatContext } from "../ai-interface/ChatContext";
import ReactMarkdown from "react-markdown";
import Spinner from "../ai-interface/Spinner";
import Image from "next/image";
import { useAISettings } from "../ai-interface/AISettingsContext";
import MarkdownRenderer from "../ai-interface/MarkdownRenderer";
// import { useSuggestedPrompts } from "../../hooks/useSuggestedPrompts";
// import SuggestedPrompts from "../ai-interface/SuggestedPrompts";

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
  const { aiSettings } = useAISettings();
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [promptError, setPromptError] = useState<string | null>(null);
  const [lastPromptFetch, setLastPromptFetch] = useState(0);
  const cooldownPeriod = 60000; // 1 minute cooldown

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: {
        node,
        model: aiSettings.model,
        temperature: aiSettings.temperature,
      },
      initialMessages: node ? chatHistory[node.name] || [] : [],
      onFinish: (message) => {
        onResponse(message.content);
        if (node) {
          updateChatHistory(node.name, messages);
        }
      },
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        const scrollContainer = chatContainerRef.current;
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      };

      // Scroll immediately for the first message
      if (messages.length === 1) {
        scrollToBottom();
      } else {
        // Use a short timeout to ensure smooth scrolling for subsequent messages
        setTimeout(scrollToBottom, 100);
      }
    }
  }, [messages]);

  useEffect(() => {
    setLastPromptFetch(0);
  }, [node?.name]);

  const fetchSuggestedPrompts = useCallback(async () => {
    const now = Date.now();
    if (now - lastPromptFetch < cooldownPeriod && lastPromptFetch !== 0) {
      console.log("Skipping prompt fetch due to cooldown");
      return;
    }

    if (node) {
      try {
        setPromptError(null);
        const response = await fetch("/api/generate-prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ node, chatHistory: messages }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch prompts");
        }

        const data = await response.json();
        if (Array.isArray(data.prompts) && data.prompts.length > 0) {
          setSuggestedPrompts(data.prompts);
          setLastPromptFetch(now);
        } else {
          throw new Error("Invalid prompts data received");
        }
      } catch (error) {
        console.error("Error fetching suggested prompts:", error);
        setPromptError(error.message);
        // Fallback to default prompts if fetch fails
        setSuggestedPrompts([
          `Tell me more about ${node.name}`,
          `What is the evolutionary history of ${node.name}?`,
          `How much DNA do humans share with ${node.name}?`,
          `What are the key characteristics of ${node.name}?`,
        ]);
      }
    }
  }, [node, messages, lastPromptFetch, cooldownPeriod]);

  useEffect(() => {
    fetchSuggestedPrompts();
  }, [fetchSuggestedPrompts, node?.name]);

  const handlePromptClick = useCallback(
    (prompt: string) => {
      handleInputChange({
        target: { value: prompt },
      } as React.ChangeEvent<HTMLInputElement>);
    },
    [handleInputChange]
  );

  const renderMessage = (message: any) => {
    if (message.isImage) {
      return (
        <div>
          <p>Here&apos;s the image you requested:</p>
          <Image
            src={message.imageUrl}
            alt="Generated image"
            width={512}
            height={512}
            className="mt-2 rounded-md"
          />
        </div>
      );
    }
    return <MarkdownRenderer content={message.content} />;
  };

  if (!node) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[750px] flex flex-col items-center justify-center text-muted-foreground bg-card rounded-lg p-6"
      >
        <Info className="w-16 h-16 mb-4 text-primary" />
        <p className="text-lg font-semibold text-center">
          Select a node to view details
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
      <Card className="h-[800px] overflow-hidden bg-gradient-to-br from-background to-emerald-50 shadow-lg">
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
              className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-2 ${
                    message.role === "assistant"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-5 py-2 rounded-lg max-w-[80%] text-wrap ${
                      message.role === "assistant"
                        ? "bg-blue-100"
                        : "bg-green-200 text-right"
                    }`}
                  >
                    {renderMessage(message)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t space-y-4">
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
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
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
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
