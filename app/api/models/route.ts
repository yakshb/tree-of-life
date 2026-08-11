import { listGroqModels, GroqApiError } from "@/lib/groq";
import { GROQ_MODELS } from "@/lib/groq-models";

export async function GET(request: Request) {
  try {
    const response = await listGroqModels(request.signal);
    const availableModels = response.data.filter(
      (model) => model.active !== false,
    );
    const activeModels = new Map(
      availableModels.map((model) => [model.id, model]),
    );

    return Response.json({
      availableModels,
      models: GROQ_MODELS.map((model) => {
        const activeModel = activeModels.get(model.id);
        return {
          ...model,
          available: Boolean(activeModel),
          contextWindow: activeModel?.context_window,
          ownedBy: activeModel?.owned_by,
        };
      }),
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof GroqApiError) {
      return Response.json(
        { error: error.message },
        { status: error.status >= 400 && error.status < 600 ? error.status : 502 },
      );
    }

    console.error("Unexpected model discovery error:", error);
    return Response.json(
      { error: "Unable to retrieve Groq models." },
      { status: 500 },
    );
  }
}
