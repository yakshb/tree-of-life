"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Dna,
  SendHorizontal,
  Sparkles,
  Square,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GROQ_MODELS, type GroqModelId } from "@/lib/groq-models";
import type { ChatMessage } from "@/types/chatTypes";
import type { TreeNodeData } from "@/types/treeTypes";
import { useAISettings } from "./AISettingsContext";
import { useChatHistory } from "./ChatContext";
import MarkdownRenderer from "./MarkdownRenderer";

interface AIAssistantProps {
  node: TreeNodeData;
  onConversationStateChange?: (hasConversation: boolean) => void;
}

export interface AIAssistantHandle {
  clearConversation: () => void;
}

const responseStyles = [
  { value: 0.25, label: "Concise" },
  { value: 0.5, label: "Standard" },
  { value: 0.75, label: "Creative" },
] as const;

function fallbackPrompts(nodeName: string) {
  return [
    `Give me a concise overview of ${nodeName}`,
    `Trace the evolutionary history of ${nodeName}`,
    `How is ${nodeName} related to neighboring groups?`,
    `What makes ${nodeName} biologically distinctive?`,
  ];
}

async function readGroqStream(
  response: Response,
  onText: (text: string) => void,
) {
  if (!response.body) throw new Error("The response stream was empty.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;

      const event = JSON.parse(data) as {
        choices?: Array<{ delta?: { content?: string } }>;
      };
      const text = event.choices?.[0]?.delta?.content;
      if (text) onText(text);
    }

    if (done) break;
  }
}

const AIAssistant = forwardRef<AIAssistantHandle, AIAssistantProps>(
  function AIAssistant({ node, onConversationStateChange }, ref) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const suggestedPromptsRef = useRef<HTMLDivElement>(null);
  const chatAbortController = useRef<AbortController | null>(null);
  const promptAbortController = useRef<AbortController | null>(null);
  const stopRequestedRef = useRef(false);
  const partialAssistantRef = useRef("");
  const { chatHistory, updateChatHistory } = useChatHistory();
  const { aiSettings, updateAISettings } = useAISettings();
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    chatHistory[node.name] ?? [],
  );
  const [input, setInput] = useState("");
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(() =>
    fallbackPrompts(node.name),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [promptScrollState, setPromptScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
    currentIndex: 0,
  });

  const updatePromptScrollState = useCallback(() => {
    const scroller = suggestedPromptsRef.current;
    if (!scroller) return;
    const currentIndex = Math.min(
      suggestedPrompts.length - 1,
      Math.max(0, Math.round(scroller.scrollLeft / scroller.clientWidth)),
    );
    setPromptScrollState({
      canScrollLeft: currentIndex > 0,
      canScrollRight: currentIndex < suggestedPrompts.length - 1,
      currentIndex,
    });
  }, [suggestedPrompts.length]);

  const goToSuggestedPrompt = useCallback((index: number) => {
    const scroller = suggestedPromptsRef.current;
    if (!scroller) return;
    scroller.scrollTo({
      left: index * scroller.clientWidth,
      behavior: "smooth",
    });
  }, []);

  const scrollSuggestedPrompts = useCallback(
    (direction: "left" | "right") => {
      const offset = direction === "right" ? 1 : -1;
      const nextIndex = Math.min(
        suggestedPrompts.length - 1,
        Math.max(0, promptScrollState.currentIndex + offset),
      );
      goToSuggestedPrompt(nextIndex);
    },
    [
      goToSuggestedPrompt,
      promptScrollState.currentIndex,
      suggestedPrompts.length,
    ],
  );

  useEffect(() => {
    const scroller = suggestedPromptsRef.current;
    if (!scroller) return;

    scroller.scrollTo({ left: 0 });
    const animationFrame = window.requestAnimationFrame(updatePromptScrollState);
    const observer = new ResizeObserver(updatePromptScrollState);
    observer.observe(scroller);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [suggestedPrompts, updatePromptScrollState]);

  const fetchSuggestedPrompts = useCallback(
    async (history: ChatMessage[]) => {
      promptAbortController.current?.abort();
      const controller = new AbortController();
      promptAbortController.current = controller;

      try {
        const response = await fetch("/api/generate-prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ node, chatHistory: history }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Prompt generation failed.");
        const data = (await response.json()) as { prompts?: string[] };
        if (!data.prompts || data.prompts.length !== 4) {
          throw new Error("Prompt generation returned an invalid response.");
        }
        setSuggestedPrompts(data.prompts);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSuggestedPrompts(fallbackPrompts(node.name));
      }
    },
    [node],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchSuggestedPrompts(messages);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      chatAbortController.current?.abort();
      promptAbortController.current?.abort();
    };
    // This component is keyed by node name, so this runs once per species.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, fetchSuggestedPrompts]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const controller = new AbortController();
    chatAbortController.current = controller;
    stopRequestedRef.current = false;
    partialAssistantRef.current = "";

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };
    const outgoingMessages = [...messages, userMessage];

    setInput("");
    setChatError(null);
    setIsLoading(true);
    setMessages([...outgoingMessages, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          node,
          messages: outgoingMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
          model: aiSettings.model,
          temperature: aiSettings.temperature,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "The AI request failed.");
      }

      await readGroqStream(response, (chunk) => {
        partialAssistantRef.current += chunk;
        setMessages([
          ...outgoingMessages,
          { ...assistantMessage, content: partialAssistantRef.current },
        ]);
      });

      if (!partialAssistantRef.current.trim()) {
        throw new Error("Groq returned an empty response.");
      }

      const completedMessages = [
        ...outgoingMessages,
        { ...assistantMessage, content: partialAssistantRef.current },
      ];
      setMessages(completedMessages);
      updateChatHistory(node.name, completedMessages);
      void fetchSuggestedPrompts(completedMessages);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        if (stopRequestedRef.current) {
          const partialContent = partialAssistantRef.current.trim();
          const stoppedMessages = partialContent
            ? [
                ...outgoingMessages,
                {
                  ...assistantMessage,
                  content: `${partialContent}\n\n_Response stopped._`,
                },
              ]
            : outgoingMessages;
          setMessages(stoppedMessages);
          updateChatHistory(node.name, stoppedMessages);
        }
        return;
      }
      setMessages(outgoingMessages);
      setChatError(
        error instanceof Error
          ? error.message
          : "The AI assistant is temporarily unavailable.",
      );
    } finally {
      if (chatAbortController.current === controller) {
        chatAbortController.current = null;
        setIsLoading(false);
      }
    }
  };

  const handleStop = () => {
    stopRequestedRef.current = true;
    chatAbortController.current?.abort();
  };

  const handleClear = useCallback(() => {
    chatAbortController.current?.abort();
    setMessages([]);
    setChatError(null);
    updateChatHistory(node.name, []);
  }, [node.name, updateChatHistory]);

  useImperativeHandle(
    ref,
    () => ({ clearConversation: handleClear }),
    [handleClear],
  );

  useEffect(() => {
    onConversationStateChange?.(messages.length > 0);
  }, [messages.length, onConversationStateChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const handleCopy = async (message: ChatMessage) => {
    await navigator.clipboard.writeText(message.content);
    setCopiedMessageId(message.id);
    window.setTimeout(() => setCopiedMessageId(null), 1_600);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div
        ref={chatContainerRef}
        className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 scroll-smooth"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-2"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold tracking-tight">
              Ask about {node.name}
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              Compare branches, explain traits, trace evolutionary history, or
              simplify a complex concept.
            </p>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.article
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={
                message.role === "assistant"
                  ? "border-b border-border/60 pb-5 last:border-b-0"
                  : "ml-auto max-w-[88%] rounded-xl rounded-br-sm bg-muted px-3.5 py-2.5 text-foreground"
              }
            >
              <div
                className={`mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                  message.role === "assistant"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <UserRound className="h-4 w-4" />
                )}
                {message.role === "assistant" ? "Field guide" : "You"}
              </div>
              {message.content ? (
                message.role === "assistant" ? (
                  <MarkdownRenderer content={message.content} />
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.content}
                  </p>
                )
              ) : (
                <div className="flex items-center gap-1 py-2" aria-label="Thinking">
                  {[0, 1, 2].map((index) => (
                    <span
                      key={index}
                      className="h-2 w-2 animate-pulse rounded-full bg-primary"
                      style={{ animationDelay: `${index * 160}ms` }}
                    />
                  ))}
                </div>
              )}
              {message.role === "assistant" && message.content && (
                <div className="mt-3 flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1.5 px-2 text-xs text-muted-foreground"
                    onClick={() => void handleCopy(message)}
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedMessageId === message.id ? "Copied" : "Copy"}
                  </Button>
                </div>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="shrink-0 border-t border-border/70 bg-background p-3">
        <div className="mb-2 overflow-hidden rounded-xl border border-border/70 bg-muted/20">
          <div className="flex h-8 items-center justify-between border-b border-border/50 px-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Try asking
            </div>
            <div className="flex items-center gap-0.5">
              <span className="mr-1 text-[10px] tabular-nums text-muted-foreground">
                {promptScrollState.currentIndex + 1} / {suggestedPrompts.length}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full text-muted-foreground"
                onClick={() => scrollSuggestedPrompts("left")}
                disabled={!promptScrollState.canScrollLeft}
                aria-label="Previous suggested question"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full text-muted-foreground"
                onClick={() => scrollSuggestedPrompts("right")}
                disabled={!promptScrollState.canScrollRight}
                aria-label="Next suggested question"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div
            ref={suggestedPromptsRef}
            className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
            onScroll={updatePromptScrollState}
            role="group"
            aria-label="Suggested questions"
            tabIndex={0}
          >
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={prompt}
                type="button"
                className="min-h-14 w-full shrink-0 snap-start whitespace-normal px-3 py-2.5 text-left text-xs leading-5 text-foreground transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 disabled:opacity-50"
                onClick={() => setInput(prompt)}
                disabled={isLoading}
                aria-label={`Use suggested question ${index + 1}: ${prompt}`}
              >
                {prompt}
              </button>
            ))}
          </div>
          <div
            className="flex h-4 items-start justify-center gap-1.5"
            aria-label="Choose a suggested question"
          >
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={prompt}
                type="button"
                className="group flex h-4 w-4 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                onClick={() => goToSuggestedPrompt(index)}
                aria-label={`Show suggested question ${index + 1}`}
                aria-current={
                  index === promptScrollState.currentIndex ? "true" : undefined
                }
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${
                    index === promptScrollState.currentIndex
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-muted-foreground/25 group-hover:bg-muted-foreground/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        {chatError && (
          <p role="alert" className="mb-2 text-sm text-destructive">
            {chatError}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-input bg-background p-2 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10"
        >
          <Textarea
            value={input}
            placeholder={`Ask about ${node.name}…`}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={8_000}
            rows={3}
            className="max-h-36 min-h-[64px] resize-none border-0 bg-transparent px-2 py-1.5 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex min-w-0 items-center gap-1 border-t border-border/60 px-1 pt-2">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground"
              title="Uses the selected node as context"
            >
              <Dna className="h-4 w-4" />
              <span className="sr-only">Selected node context enabled</span>
            </span>
            <div className="min-w-0 flex-1">
              <Select
                value={aiSettings.model}
                onValueChange={(model) =>
                  updateAISettings({
                    ...aiSettings,
                    model: model as GroqModelId,
                  })
                }
                disabled={isLoading}
              >
                <SelectTrigger
                  aria-label="AI model"
                  className="h-8 w-full min-w-0 border-0 bg-muted/60 px-2 text-xs shadow-none focus:ring-0 [&>span]:truncate"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GROQ_MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select
              value={String(aiSettings.temperature)}
              onValueChange={(temperature) =>
                updateAISettings({
                  ...aiSettings,
                  temperature: Number(temperature),
                })
              }
              disabled={isLoading}
            >
              <SelectTrigger
                aria-label="Response style"
                className="h-8 w-[94px] shrink-0 border-0 bg-muted/60 px-2 text-xs shadow-none focus:ring-0"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {responseStyles.map((style) => (
                  <SelectItem key={style.value} value={String(style.value)}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8 shrink-0 rounded-md"
                onClick={handleStop}
                aria-label="Stop response"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-md"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <SendHorizontal className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </form>
        <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
          AI can make mistakes. Verify important biological claims.
        </p>
      </div>
    </div>
  );
  },
);

AIAssistant.displayName = "AIAssistant";

export default AIAssistant;
