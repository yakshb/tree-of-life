# AI-Interactive Tree of Life Explorer

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [AI Integration](#ai-integration)
- [Getting Started](#getting-started)
- [Key Components](#key-components)
- [Advanced Features](#advanced-features)
- [Contributing](#contributing)
- [License](#license)
- [About the Author](#about-the-author)

## Introduction

The AI-Interactive Tree of Life Explorer is a cutting-edge educational tool that revolutionizes the way we visualize and explore evolutionary relationships between different life forms. By leveraging state-of-the-art AI technologies and interactive data visualization, this project offers an unparalleled, engaging approach to understanding the complexities of biological evolution.

Our tool stands out by providing real-time, AI-generated insights and prompts, making the exploration of the tree of life an interactive and personalized learning experience. Whether you're a student, educator, or enthusiast, this platform offers a unique blend of visual learning and AI-assisted discovery.

## Features

- Interactive, zoomable, and pannable visualization of the tree of life
- AI-powered exploration with dynamic prompt generation
- Real-time chat interface with an AI assistant for in-depth queries
- Adaptive learning experience that evolves with user interactions
- Dynamic node expansion and collapsing for focused exploration
- Exploration path tracking for easy navigation through complex hierarchies
- Responsive design optimized for various devices and screen sizes
- Efficient caching and rate limiting for optimal performance

## Technologies Used

- [Next.js 14](https://nextjs.org/) with App Router for efficient, server-side rendering and routing
- [React 18](https://reactjs.org/) for building a dynamic and responsive user interface
- [TypeScript](https://www.typescriptlang.org/) for type-safe code and enhanced developer experience
- [react-d3-tree](https://github.com/bkrem/react-d3-tree) for rendering the interactive phylogenetic tree
- [Framer Motion](https://www.framer.com/motion/) for smooth, physics-based animations
- [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling
- [Vercel AI SDK](https://github.com/vercel/ai) for seamless AI integration
- [Groq](https://groq.com/) for high-performance AI inference

## AI Integration

The AI component of this project is powered by advanced language models and offers several key features:

- Dynamic prompt generation based on the current node and chat history
- Real-time chat interface for in-depth queries about specific life forms
- Adaptive learning that tailors responses to the user's exploration path
- Efficient caching of AI responses to reduce latency and API usage
- Rate limiting to ensure fair usage and prevent abuse

We use the Groq API with the `llama-3-8b` model, by default, for the chat interface, ensuring fast and relevant responses. However, thanks to Groq's wide selection of open-source large language models, users have access to the latest Llama Models by Meta, Gemma by Google and Mixtral 8x7B by Mistral.

## Getting Started

To set up a local copy of the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yakshb/tree-of-life.git
   ```

2. Navigate to the project directory:
   ```
   cd tree-of-life
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   GROQ_API_KEY=your_groq_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Key Components

- `VisualTreeOfLife`: Orchestrates the tree visualization and user interactions
- `AIAssistant`: Manages the AI chat interface and prompt generation
- `InfoPanel`: Displays detailed information about selected nodes
- `ExplorationPath`: Tracks and displays the user's navigation history
- `CustomNodeRenderer`: Defines the appearance and behavior of individual tree nodes
- `generate-prompts` API route: Handles AI-powered prompt generation with caching and rate limiting

## Advanced Features

- **Adaptive Prompt Generation**: The AI generates context-aware prompts based on the current node and chat history, ensuring relevance and encouraging deeper exploration.
- **Efficient Caching**: AI-generated prompts are cached using Vercel KV, reducing API calls and improving response times for frequently accessed information.
- **Intelligent Rate Limiting**: Implements Upstash Ratelimit to prevent API abuse while ensuring a smooth user experience.
- **Streaming Responses**: Utilizes streaming capabilities for real-time AI responses, enhancing the interactivity of the chat interface.
- **Error Handling and Fallbacks**: Robust error handling with fallback mechanisms to ensure uninterrupted user experience even when AI services are unavailable.

## Contributing

We welcome contributions to enhance this educational tool. Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## About the Author

Yaksh Birla - AI and Web Development Enthusiast

- [yakshb.com](http://yakshb.com)
- GitHub: [@yakshb](https://github.com/yakshb)
- LinkedIn: [Yaksh Birla](https://www.linkedin.com/in/yakshb/)

Project Link: [https://github.com/yakshb/tree-of-life](https://github.com/yakshb/tree-of-life)

---

We're excited to see how this tool can evolve with community contributions. Together, we can make the exploration of life's diversity an engaging and AI-enhanced experience for learners worldwide!