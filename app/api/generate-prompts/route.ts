import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 15;

export async function POST(request: Request) {
  const { node, chatHistory } = await request.json();

  try {
    const stream = await streamText({
      model: openai('gpt-4o'),
      system: `You are an AI assistant for a Tree of Life Explorer application. 
      Generate 5 relevant and engaging questions about the given organism, considering the chat history provided. 
      Each question should be concise and suitable for a 12-year-old's understanding. 
      Provide the questions as a numbered list.`,
      messages: [
        { role: "user", content: `Generate 5 questions about ${node.name}. Chat history: ${JSON.stringify(chatHistory)}` }
      ],
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      fullResponse += chunk;
    }

    const suggestedPrompts = fullResponse.split('\n').filter(line => line.trim().match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, '').trim());

    return NextResponse.json({ suggestedPrompts });
  } catch (error) {
    console.error('Error generating prompts:', error);
    return NextResponse.json({ error: 'Error generating prompts' }, { status: 500 });
  }
}