import { createGroqChatCompletion, GroqApiError } from "@/lib/groq";
import { PROMPT_GENERATION_MODEL } from "@/lib/groq-models";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { z } from "zod";

const requestSchema = z.object({
  node: z
    .object({
      name: z.string().min(1).max(200),
      attributes: z
        .object({
          scientificName: z.string().max(300).optional(),
          description: z.string().max(4_000).optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough(),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8_000),
      }),
    )
    .max(20)
    .default([]),
});

const FALLBACK_ERROR = "Failed to generate suggested questions.";
const completionSchema = z.object({
  prompts: z.array(z.string().trim().min(8).max(300)).min(4),
});

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(
    `prompts:${getClientIdentifier(request)}`,
    15,
    60_000,
  );
  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many prompt requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 100_000) {
    return Response.json({ error: "Request body is too large." }, { status: 413 });
  }

  try {
    const { node, chatHistory } = requestSchema.parse(await request.json());
    const response = await createGroqChatCompletion({
      model: PROMPT_GENERATION_MODEL,
      maxCompletionTokens: 300,
      temperature: 0.4,
      responseFormat: { type: "json_object" },
      signal: request.signal,
      messages: [
        {
          role: "system",
          content:
            'Generate exactly four distinct, engaging biology questions for a Tree of Life explorer. Return only one JSON object with this shape: {"prompts":["question 1","question 2","question 3","question 4"]}. Each item must be a complete standalone question. Do not add other keys or commentary.',
        },
        {
          role: "user",
          content: `Selected node: ${node.name}\nScientific name: ${
            node.attributes?.scientificName ?? "Not provided"
          }\nDescription: ${
            node.attributes?.description ?? "Not provided"
          }\nRecent conversation: ${JSON.stringify(chatHistory.slice(-6))}`,
        },
      ],
    });

    const completion = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = completion.choices?.[0]?.message?.content ?? "";
    let prompts: string[];

    try {
      const parsed = completionSchema.parse(JSON.parse(text));
      prompts = parsed.prompts
        .map((prompt) => prompt.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .slice(0, 4);
    } catch {
      return Response.json({ error: FALLBACK_ERROR }, { status: 502 });
    }

    if (prompts.length !== 4) {
      return Response.json({ error: FALLBACK_ERROR }, { status: 502 });
    }

    return Response.json({ prompts });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid prompt request." }, { status: 400 });
    }

    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    if (error instanceof GroqApiError) {
      return Response.json(
        { error: error.message },
        { status: error.status >= 400 && error.status < 600 ? error.status : 502 },
      );
    }

    console.error("Unexpected prompt generation error:", error);
    return Response.json({ error: FALLBACK_ERROR }, { status: 500 });
  }
}
