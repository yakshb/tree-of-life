import "server-only";

import type { GroqModelId } from "@/lib/groq-models";

const GROQ_API_BASE_URL = "https://api.groq.com/openai/v1";

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqRequestOptions {
  model: GroqModelId;
  messages: GroqMessage[];
  temperature: number;
  stream?: boolean;
  maxCompletionTokens?: number;
  responseFormat?: { type: "json_object" };
  signal?: AbortSignal;
}

export class GroqApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "GroqApiError";
  }
}

function getApiKey() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new GroqApiError("GROQ_API_KEY is not configured.", 503);
  }

  return apiKey;
}

async function parseGroqError(response: Response) {
  let message = `Groq request failed with status ${response.status}.`;

  try {
    const body = (await response.json()) as {
      error?: { message?: string };
    };
    if (body.error?.message) message = body.error.message;
  } catch {
    // The status code still provides a useful fallback when the body is not JSON.
  }

  return new GroqApiError(message, response.status);
}

export async function createGroqChatCompletion({
  model,
  messages,
  temperature,
  stream = false,
  maxCompletionTokens,
  responseFormat,
  signal,
}: GroqRequestOptions) {
  const response = await fetch(`${GROQ_API_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream,
      ...(maxCompletionTokens
        ? { max_completion_tokens: maxCompletionTokens }
        : {}),
      ...(responseFormat ? { response_format: responseFormat } : {}),
    }),
    signal,
    cache: "no-store",
  });

  if (!response.ok) throw await parseGroqError(response);

  return response;
}

export async function listGroqModels(signal?: AbortSignal) {
  const response = await fetch(`${GROQ_API_BASE_URL}/models`, {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    signal,
    next: { revalidate: 300 },
  });

  if (!response.ok) throw await parseGroqError(response);

  return (await response.json()) as {
    data: Array<{
      id: string;
      object: string;
      created: number;
      owned_by: string;
      active?: boolean;
      context_window?: number;
    }>;
    object: string;
  };
}
