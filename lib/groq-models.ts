export const GROQ_MODELS = [
  {
    id: "llama-3.1-8b-instant",
    label: "Llama 3.1 8B Instant",
    provider: "Meta",
    description: "Fastest",
  },
  {
    id: "llama-3.3-70b-versatile",
    label: "Llama 3.3 70B Versatile",
    provider: "Meta",
    description: "Balanced",
  },
  {
    id: "openai/gpt-oss-120b",
    label: "GPT-OSS 120B",
    provider: "OpenAI",
    description: "Most capable",
  },
  {
    id: "openai/gpt-oss-20b",
    label: "GPT-OSS 20B",
    provider: "OpenAI",
    description: "Fast reasoning",
  },
] as const;

export type GroqModelId = (typeof GROQ_MODELS)[number]["id"];

export const DEFAULT_GROQ_MODEL: GroqModelId = "llama-3.1-8b-instant";
export const PROMPT_GENERATION_MODEL: GroqModelId = "llama-3.1-8b-instant";

const GROQ_MODEL_IDS = new Set<string>(GROQ_MODELS.map(({ id }) => id));

export function isGroqModelId(value: unknown): value is GroqModelId {
  return typeof value === "string" && GROQ_MODEL_IDS.has(value);
}
