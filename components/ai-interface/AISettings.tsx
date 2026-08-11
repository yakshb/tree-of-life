"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetaIcon from "@/assets/icons/meta";
import OpenAIIcon from "@/assets/icons/openai";
import { GROQ_MODELS, type GroqModelId } from "@/lib/groq-models";
import { useAISettings } from "./AISettingsContext";

const temperatureOptions = [
  { value: 0.25, label: "Concise" },
  { value: 0.5, label: "Standard" },
  { value: 0.75, label: "Creative" },
];

type Availability = Partial<Record<GroqModelId, boolean>>;

export default function AISettings() {
  const { aiSettings, updateAISettings } = useAISettings();
  const [availability, setAvailability] = useState<Availability>({});

  useEffect(() => {
    const controller = new AbortController();

    async function refreshAvailability() {
      try {
        const response = await fetch("/api/models", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as {
          models?: Array<{ id: GroqModelId; available: boolean }>;
        };
        setAvailability(
          Object.fromEntries(
            (data.models ?? []).map((model) => [model.id, model.available]),
          ) as Availability,
        );
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.warn("Unable to refresh Groq model availability:", error);
        }
      }
    }

    void refreshAvailability();
    return () => controller.abort();
  }, []);

  const handleModelChange = (model: GroqModelId) => {
    updateAISettings({ ...aiSettings, model });
  };

  const handleTemperatureChange = ([temperature]: number[]) => {
    if (temperature !== undefined) {
      updateAISettings({ ...aiSettings, temperature });
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="ai-settings">
        <AccordionTrigger className="text-lg font-semibold">
          AI Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-5 rounded-md bg-muted/50 p-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="model" className="w-24 flex-shrink-0">
                Model
              </Label>
              <Select
                value={aiSettings.model}
                onValueChange={(value) =>
                  handleModelChange(value as GroqModelId)
                }
              >
                <SelectTrigger id="model" className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {GROQ_MODELS.map((model) => {
                    const unavailable = availability[model.id] === false;
                    const availabilityClass =
                      availability[model.id] === undefined
                        ? "bg-gray-400"
                        : unavailable
                          ? "bg-red-500"
                          : "bg-green-500";
                    const Icon = model.provider === "Meta" ? MetaIcon : OpenAIIcon;

                    return (
                      <SelectItem
                        key={model.id}
                        value={model.id}
                        disabled={unavailable}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${availabilityClass}`}
                          />
                          <Icon className="h-5 w-5" />
                          <span>{model.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {unavailable ? "Unavailable" : model.description}
                          </span>
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature">Response style</Label>
                <span className="text-sm font-medium">
                  {temperatureOptions.find(
                    (option) => option.value === aiSettings.temperature,
                  )?.label ?? "Standard"}
                </span>
              </div>
              <Slider
                id="temperature"
                min={0.25}
                max={0.75}
                step={0.25}
                value={[aiSettings.temperature]}
                onValueChange={handleTemperatureChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Concise</span>
                <span>Standard</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
