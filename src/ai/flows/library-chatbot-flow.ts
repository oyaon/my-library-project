'use server';

/**
 * @fileOverview A library chatbot AI agent.
 *
 * - chatWithLibrary - A function that handles the chatbot conversation.
 * - ChatWithLibraryInput - The input type for the chatWithLibrary function.
 * - ChatWithLibraryOutput - The return type for the chatWithLibrary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ChatWithLibraryInputSchema = z.object({
  userMessage: z.string().describe('The message from the user.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The history of the conversation.'),
});

export type ChatWithLibraryInput = z.infer<typeof ChatWithLibraryInputSchema>;

const ChatWithLibraryOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user message.'),
});

export type ChatWithLibraryOutput = z.infer<typeof ChatWithLibraryOutputSchema>;

export async function chatWithLibrary(input: ChatWithLibraryInput): Promise<ChatWithLibraryOutput> {
  return chatWithLibraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'libraryChatbotPrompt',
  input: {
    schema: z.object({
      userMessage: z.string().describe('The message from the user.'),
      chatHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })).optional().describe('The history of the conversation.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The chatbot\'s response to the user message.'),
    }),
  },
  prompt: `You are a helpful and friendly library chatbot. Your goal is to answer user questions about the library, its resources, and events.

Here's the chat history (if any):
{{#if chatHistory}}
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

User: {{{userMessage}}}

Chatbot:`,
});

const chatWithLibraryFlow = ai.defineFlow<
  typeof ChatWithLibraryInputSchema,
  typeof ChatWithLibraryOutputSchema
>(
  {
    name: 'libraryChatbotFlow',
    inputSchema: ChatWithLibraryInputSchema,
    outputSchema: ChatWithLibraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return { response: output!.response };
  }
);
