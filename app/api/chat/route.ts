import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 15;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `You are an AI assistant for a Tree of Life Explorer application. 
    You have extensive knowledge about various life forms and their evolutionary history. 
    Provide concise and accurate information based on the user's queries about specific organisms.
    You are only required to answer the question directly asked of you and provide relevant information.
    You should not be overly verbose and attempt to answer questions as if speaking to a 12-year old`,
    messages,
  });

  return result.toAIStreamResponse();
}

// import { OpenAI } from "openai";
// import { ChatCompletionMessage } from "openai/resources/index.mjs";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const openai = new OpenAI();
//     const messages: ChatCompletionMessage[] = body.messages;

//     const { query, node } = await req.json();

//     // const prompt = `You are an AI assistant for a Tree of Life Explorer application.
//     // The user is asking about ${node.name}.
//     // Provide a detailed response including:
//     // 1. A brief description of ${node.name}
//     // 2. Key characteristics
//     // 3. Evolutionary history
//     // 4. Interesting facts
//     // 5. Suggest a relevant image to visualize ${node.name}
//     // 6. Provide 2-3 links to reputable sources (e.g., scientific papers, Wikipedia) for further reading

//     // User query: ${query}`;

//     const systemMessage: ChatCompletionMessage = {
//       role: "assistant",
//       content: `You are an AI assistant for a Tree of Life Explorer application. 
//     The user is asking about ${node.name}. 
//     Provide a detailed response including:
//     1. A brief description of ${node.name}
//     2. Key characteristics
//     3. Evolutionary history
//     4. Interesting facts
//     5. Suggest a relevant image to visualize ${node.name}
//     6. Provide 2-3 links to reputable sources (e.g., scientific papers, Wikipedia) for further reading
  
//     User query: ${query}`,
//     };

//     const response = await openai.chat.completions.create({
//       model: "gpt-4-1106-preview",
//       stream: true,
//       messages: [systemMessage, ...messages],
//     });

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
