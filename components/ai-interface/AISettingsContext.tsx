"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_GROQ_MODEL,
  type GroqModelId,
} from "@/lib/groq-models";

interface AISettings {
  model: GroqModelId;
  temperature: number;
}

interface AISettingsContextType {
  aiSettings: AISettings;
  updateAISettings: (newSettings: AISettings) => void;
}

const defaultSettings: AISettings = {
  model: DEFAULT_GROQ_MODEL,
  temperature: 0.5,
};

const AISettingsContext = createContext<AISettingsContextType | undefined>(
  undefined,
);

export function AISettingsProvider({ children }: { children: ReactNode }) {
  const [aiSettings, setAISettings] = useState<AISettings>(defaultSettings);
  const updateAISettings = useCallback((newSettings: AISettings) => {
    setAISettings(newSettings);
  }, []);
  const value = useMemo(
    () => ({ aiSettings, updateAISettings }),
    [aiSettings, updateAISettings],
  );

  return (
    <AISettingsContext.Provider value={value}>
      {children}
    </AISettingsContext.Provider>
  );
}

export function useAISettings() {
  const context = useContext(AISettingsContext);
  if (!context) {
    throw new Error("useAISettings must be used within AISettingsProvider");
  }
  return context;
}
