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
  recentBorrowedBooks: z.array(z.string()).describe('A list of IDs for recently borrowed books.'),
  userId: z.string().describe('The ID of the user requesting book recommendations.'),
});

export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  recommendedBookIds: z.array(z.string()).describe('A list of recommended book IDs.'),
});

export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {
    schema: z.object({
      genrePreferences: z.array(z.string()).describe('A list of preferred book genres.'),
      authorPreferences: z.array(z.string()).describe('A list of preferred authors.'),
      recentBorrowedBooks: z.array(z.string()).describe('A list of IDs for recently borrowed books.'),
      userId: z.string().describe('The ID of the user requesting book recommendations.'),
    }),
  },
  output: {
    schema: z.object({
      recommendedBookIds: z.array(z.string()).describe('A list of recommended book IDs.'),
    }),
  },
  prompt: `You are a book recommendation expert.

Based on the user's preferences, recommend a list of book IDs.

User ID: {{{userId}}}
Genre Preferences: {{{genrePreferences}}}
Author Preferences: {{{authorPreferences}}}
Recently Borrowed Books: {{{recentBorrowedBooks}}}

Return only the book IDs in the recommendedBookIds array.`,
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
    const {output} = await prompt(input);
    return output!;
  }
);
