import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from 'ai';

interface ChatContextType {
  chatHistory: Record<string, Message[]>;
  updateChatHistory: (nodeId: string, messages: Message[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>({});

  const updateChatHistory = (nodeId: string, messages: Message[]) => {
    setChatHistory(prev => ({ ...prev, [nodeId]: messages }));
  };

  return (
    <ChatContext.Provider value={{ chatHistory, updateChatHistory }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};