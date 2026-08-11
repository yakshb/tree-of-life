"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ChatMessage } from "@/types/chatTypes";

interface ChatContextType {
  chatHistory: Record<string, ChatMessage[]>;
  updateChatHistory: (nodeId: string, messages: ChatMessage[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatHistory, setChatHistory] = useState<
    Record<string, ChatMessage[]>
  >({});
  const updateChatHistory = useCallback(
    (nodeId: string, messages: ChatMessage[]) => {
      setChatHistory((previous) => ({ ...previous, [nodeId]: messages }));
    },
    [],
  );
  const value = useMemo(
    () => ({ chatHistory, updateChatHistory }),
    [chatHistory, updateChatHistory],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatHistory() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatHistory must be used within ChatProvider");
  }
  return context;
}
