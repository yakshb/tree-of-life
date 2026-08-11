import { z } from "zod";
import { getGbifTaxonEnrichment } from "@/lib/taxonomy/gbif";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

export const maxDuration = 15;

const querySchema = z.object({
  name: z.string().trim().min(1).max(200),
  scientificName: z.string().trim().min(1).max(300).optional(),
});

export async function GET(request: Request) {
  const rateLimit = checkRateLimit(
    `taxa:${getClientIdentifier(request)}`,
    60,
    60_000,
  );

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many taxonomy requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  try {
    const url = new URL(request.url);
    const input = querySchema.parse({
      name: url.searchParams.get("name"),
      scientificName: url.searchParams.get("scientificName") || undefined,
    });
    const data = await getGbifTaxonEnrichment({
      ...input,
      signal: request.signal,
    });

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid taxon query." }, { status: 400 });
    }

    console.error("Taxonomy enrichment failed:", error);
    return Response.json(
      { error: "Taxonomy enrichment is temporarily unavailable." },
      { status: 502 },
    );
  }
}
