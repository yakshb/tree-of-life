import { createGroqChatCompletion, GroqApiError } from "@/lib/groq";
import { DEFAULT_GROQ_MODEL, isGroqModelId } from "@/lib/groq-models";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { z } from "zod";

export const maxDuration = 30;

const requestSchema = z.object({
  model: z.unknown().optional(),
  temperature: z.number().min(0.01).max(2).optional(),
  node: z
    .object({
      name: z.string().min(1).max(200),
      attributes: z
        .object({
          scientificName: z.string().max(300).optional(),
          description: z.string().max(4_000).optional(),
          taxonomicRank: z.string().max(100).optional(),
          status: z.string().max(100).optional(),
          age: z.string().max(200).optional(),
          geologicalAge: z.string().max(200).optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough()
    .nullable()
    .optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8_000),
      }),
    )
    .min(1)
    .max(50),
});

function errorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }

  if (error instanceof SyntaxError) {
    return Response.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (error instanceof GroqApiError) {
    const status = error.status >= 400 && error.status < 600 ? error.status : 502;
    return Response.json({ error: error.message }, { status });
  }

  console.error("Unexpected chat error:", error);
  return Response.json(
    { error: "The AI assistant is temporarily unavailable." },
    { status: 500 },
  );
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(
    `chat:${getClientIdentifier(request)}`,
    20,
    60_000,
  );
  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many chat requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 200_000) {
    return Response.json({ error: "Request body is too large." }, { status: 413 });
  }

  try {
    const body = requestSchema.parse(await request.json());
    if (body.model !== undefined && !isGroqModelId(body.model)) {
      return Response.json(
        { error: "The requested Groq model is not supported." },
        { status: 400 },
      );
    }
    const model = body.model ?? DEFAULT_GROQ_MODEL;
    const nodeContext = body.node
      ? `The selected node is ${body.node.name}${
          body.node.attributes?.scientificName
            ? ` (${body.node.attributes.scientificName})`
            : ""
        }.
Taxonomic rank: ${body.node.attributes?.taxonomicRank ?? "unranked"}.
Status: ${body.node.attributes?.status ?? "unknown"}.
Time range: ${body.node.attributes?.age ?? "not specified"}.
Geological range: ${body.node.attributes?.geologicalAge ?? "not specified"}.
Curated summary: ${body.node.attributes?.description ?? "not available"}`
      : "No tree node is currently selected.";

    const response = await createGroqChatCompletion({
      model,
      temperature: body.temperature ?? 0.5,
      stream: true,
      signal: request.signal,
      messages: [
        {
          role: "system",
          content: `You are the AI guide for Genosphere, an interactive Tree of Life explorer.

Answer only questions about biology, evolution, biodiversity, taxonomy, the history of life, or clearly labeled speculation about future or digital life. Politely decline unrelated requests. Explain concepts accurately in clear language suitable for a curious 12-year-old, while preserving scientific nuance. Never present speculation as established fact.

${nodeContext}

Use concise Markdown with descriptive headings when they improve readability. Include up to three reputable further-reading links only when they are directly relevant. Do not invent citations or URLs.`,
        },
        ...body.messages,
      ],
    });

    if (!response.body) {
      return Response.json(
        { error: "Groq returned an empty response." },
        { status: 502 },
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
