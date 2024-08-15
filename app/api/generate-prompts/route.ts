// app/api/generate-prompts/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { node, chatHistory } = await req.json();

  try {
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      maxTokens: 200,
      messages: [
        {
          role: "system",
          content: `You are an AI assistant generating relevant prompts for a Tree of Life Explorer application. Based on the current node and chat history, suggest 4 engaging questions or prompts that would be interesting for users to explore next. Output as a simple list.`
        },
        {
          role: "user",
          content: `Current node: ${JSON.stringify(node)}. Chat history: ${JSON.stringify(chatHistory)}. Do not include any text before or after the prompts, only list questions. Be creative with your prompts. Generate 4 relevant prompts in the following example format:
          1. What are some unique features found in ${node.name}?
          2. What is the role of ${node.name} in the food chain?
          3. ...`
        }
      ],
      temperature: 0.7,
      abortSignal: req.signal, // Forward the abort signal
    });

    const prompts = text.split('\n').filter(line => line.trim() !== '').slice(0, 4);

    return NextResponse.json({ prompts });
  } catch (error: any) {
    console.error('Error generating prompts:', error);
    if (error.statusCode === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Failed to generate prompts' }, { status: 500 });
  }
}