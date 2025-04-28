'use server';

/**
 * @fileOverview A book recommendation AI agent.
 *
 * - recommendBooks - A function that handles the book recommendation process.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RecommendBooksInputSchema = z.object({
  genrePreferences: z.array(z.string()).describe('A list of preferred book genres.'),
  authorPreferences: z.array(z.string()).describe('A list of preferred authors.'),
  recentBorrowedBookIds: z.array(z.string()).describe('A list of IDs for recently borrowed books.'),
  userId: z.string().describe('The ID of the user requesting book recommendations.'),
  description: z.string().optional().describe('The description of the user.'),
});

export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  recommendedBookIds: z.array(z.string()).describe('A list of recommended book IDs.'),
  reasoning: z.string().describe('The reasoning behind the book recommendations.'),
});

export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  try {
    return await recommendBooksFlow(input);
  } catch (error: any) {
    console.error('Error in recommendBooks flow:', error);
    throw new Error(`Failed to recommend books: ${error.message}`);
  }
}

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {
    schema: z.object({
      genrePreferences: z.array(z.string()).describe('A list of preferred book genres.'),
      authorPreferences: z.array(z.string()).describe('A list of preferred authors.'),
      recentBorrowedBookIds: z.array(z.string()).describe('A list of IDs for recently borrowed books.'),
      userId: z.string().describe('The ID of the user requesting book recommendations.'),
      description: z.string().optional().describe('The description of the user.'),
    }),
  },
  output: {
    schema: z.object({
      recommendedBookIds: z.array(z.string()).describe('A list of recommended book IDs.'),
      reasoning: z.string().describe('The reasoning behind the book recommendations.'),
    }),
  },
  prompt: `You are a book recommendation expert. Based on the user's stated preferences, 
  you will provide a list of book IDs from the library's catalog that the user might enjoy.  You will also provide a detailed
  reasoning behind why you selected each book ID.

Here's some information about the user:
User ID: {{{userId}}}
Description: {{{description}}}
Preferred Genres: {{{genrePreferences}}}
Preferred Authors: {{{authorPreferences}}}
Recently Borrowed Books (by ID): {{{recentBorrowedBookIds}}}

Provide the recommended book IDs as a JSON array in the 'recommendedBookIds' field. 
Also, explain your reasoning in the 'reasoning' field.
`,
});

const recommendBooksFlow = ai.defineFlow<
  typeof RecommendBooksInputSchema,
  typeof RecommendBooksOutputSchema
>(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('No output from prompt.');
      }
      return output;
    } catch (error: any) {
      console.error('Error in recommendBooksFlow:', error);
      throw new Error(`Failed to generate book recommendations: ${error.message}`);
    }
  }
);
