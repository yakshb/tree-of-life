import React, { useContext } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AISettingsContext } from "./AISettingsContext";
import MetaIcon from "../../assets/icons/meta";
import MistralIcon from "../../assets/icons/mistral";
import GoogleIcon from "@/assets/icons/google";
import { Info } from "lucide-react";
import AnthropicIcon from "@/assets/icons/anthropic";
import OpenAIIcon from "@/assets/icons/openai";

const groqModels = [
//   {
//     value: "gpt-4o",
//     label: "GPT-4o",
//     provider: "OpenAI",
//     icon: OpenAIIcon,
//     description: "Unavailable",
//     disabled: true,
//   },
//   {
//     value: "gpt-4o-mini",
//     label: "GPT-4o mini",
//     provider: "OpenAI",
//     icon: OpenAIIcon,
//     description: "Unavailable",
//     disabled: true,
//   },
//   {
//     value: "gpt-4-turbo",
//     label: "GPT-4 Turbo",
//     provider: "OpenAI",
//     icon: OpenAIIcon,
//     description: "Unavailable",
//     disabled: true,
//   },
//   {
//     value: "claude-3.5-haiku",
//     label: "Claude 3.5 Haiku",
//     provider: "Anthropic",
//     icon: AnthropicIcon,
//     description: "Unavailable",
//     disabled: true,
//   },
//   {
//     value: "claude-3.5-opus",
//     label: "Claude 3.5 Opus",
//     provider: "Anthropic",
//     icon: AnthropicIcon,
//     description: "Unavailable",
//     disabled: true,
//   },
  {
    value: "llama-3.1-405b-reasoning",
    label: "Llama 3.1 405B",
    provider: "Meta",
    icon: MetaIcon,
    description: "Unavailable",
    disabled: true,
  },
  {
    value: "llama-3.1-70b-versatile",
    label: "Llama 3.1 70B",
    provider: "Meta",
    icon: MetaIcon,
    description: "Default",
  },
  {
    value: "llama-3.1-8b-instant",
    label: "Llama 3.1 8B",
    provider: "Meta",
    icon: MetaIcon,
    description: "Fastest",
  },
  {
    value: "llama3-70b-8192",
    label: "LLaMa 3 70B",
    provider: "Meta",
    icon: MetaIcon,
    description: "Recommended",
  },
  {
    value: "llama3-8b-8192",
    label: "LLaMa 3 8B",
    provider: "Meta",
    icon: MetaIcon,
    description: "",
  },
  {
    value: "mixtral-8x7b-32768",
    label: "Mixtral 8x7B",
    provider: "Mistral",
    icon: MistralIcon,
    description: "",
  },
  {
    value: "gemma-7b-it",
    label: "Gemma 7B",
    provider: "Google",
    icon: GoogleIcon,
    contextWindow: 8192,
  },
  {
    value: "gemma2-9b-it",
    label: "Gemma 2 9B",
    provider: "Google",
    icon: GoogleIcon,
    contextWindow: 8192,
  },
];

const temperatureOptions = [
  { value: 0.25, label: "Concise" },
  { value: 0.5, label: "Standard" },
  { value: 0.75, label: "Detailed" },
];

export default function AISettings() {
  const { aiSettings, updateAISettings } = useContext(AISettingsContext);

  const handleModelChange = (newModel: string) => {
    updateAISettings({ ...aiSettings, model: newModel });
  };

  const handleTemperatureChange = (newTemperature: number[]) => {
    updateAISettings({ ...aiSettings, temperature: newTemperature[0] });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="ai-settings">
        <AccordionTrigger className="text-lg font-semibold">
          <p className="flex items-center space-x-2">
            AI Settings
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 ml-2 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure AI model and response style</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-4">
              <Label htmlFor="model" className="w-20 flex-shrink-0">
                Model:
              </Label>
              <Select
                value={aiSettings.model}
                onValueChange={handleModelChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {groqModels.map((model) => (
                    <SelectItem
                      key={model.value}
                      value={model.value}
                      disabled={model.disabled}
                    >
                      <div className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            model.disabled ? "bg-red-500" : "bg-green-500"
                          }`}
                        />
                        <model.icon className="w-5 h-5 mr-2" />
                        <span>{model.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the AI model for generating responses</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature" className="font-medium">
                  Response Style:
                </Label>
                <span className="text-sm font-medium">
                  {
                    temperatureOptions.find(
                      (o) => o.value === aiSettings.temperature
                    )?.label
                  }
                </span>
              </div>
              <Slider
                id="temperature"
                min={0.25}
                max={0.75}
                step={0.25}
                value={[aiSettings.temperature]}
                onValueChange={handleTemperatureChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Concise</span>
                <span>Standard</span>
                <span>Detailed</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
