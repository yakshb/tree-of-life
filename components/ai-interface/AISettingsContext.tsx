import React, { createContext, useState, useContext } from 'react';

interface AISettings {
  model: string;
  temperature: number;
}

interface AISettingsContextType {
  aiSettings: AISettings;
  updateAISettings: (newSettings: AISettings) => void;
}

const defaultSettings: AISettings = {
    model: "llama-3.1-70b-versatile", // or any other model ID you prefer as default
    temperature: 0.5,
  };

export const AISettingsContext = createContext<AISettingsContextType>({
  aiSettings: defaultSettings,
  updateAISettings: () => {},
});

export const AISettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiSettings, setAISettings] = useState<AISettings>(defaultSettings);

  const updateAISettings = (newSettings: AISettings) => {
    setAISettings(newSettings);
  };

  return (
    <AISettingsContext.Provider value={{ aiSettings, updateAISettings }}>
      {children}
    </AISettingsContext.Provider>
  );
};

export const useAISettings = () => useContext(AISettingsContext);