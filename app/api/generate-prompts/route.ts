// pages/api/generatePrompts.ts
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextApiRequest, NextApiResponse } from 'next';

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { node, chatHistory } = req.body;

  try {
    const { text } = await generateText({
      model: groq("llama3-8b-8192"), // Use the model passed from the frontend
      messages: [
        {
          role: "system",
          content: `You are an AI assistant generating relevant prompts for a Tree of Life Explorer application. Based on the current node and chat history, suggest 4 engaging questions or prompts that would be interesting for users to explore next. Output format should be JSON in the following structure:
          {
            "q1": "First question",
            "q2": "Second question",
            "q3": "Third question",
            "q4": "Fourth question"
          }`
        },
        {
          role: "user",
          content: `Current node: ${JSON.stringify(node)}. Chat history: ${JSON.stringify(chatHistory)}. Generate 4 relevant prompts.`
        }
      ],
      temperature: 0.7,
    });

    // Parse the JSON output
    const parsedPrompts = JSON.parse(text);

    // Extract prompts from the parsed JSON
    const generatedPrompts = Object.values(parsedPrompts);

    res.status(200).json({ prompts: generatedPrompts });
  } catch (error) {
    console.error('Error generating prompts:', error);
    res.status(500).json({ message: 'Error generating prompts' });
  }
}