'use server';

/**
 * @fileOverview Generates personalized content recommendations based on user viewing history.
 *
 * - generatePersonalizedRecommendations - A function that generates personalized content recommendations.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe(
      'A comma-separated list of titles the user has previously watched. Example: Breaking Bad, The Office, Parks and Recreation'
    ),
  contentType: z
    .enum(['movie', 'tv series', 'any'])
    .default('any')
    .describe('The type of content to recommend (movie, tv series, or any).'),
  streamingPlatformPreferences: z
    .string()
    .optional()
    .describe(
      'A comma-separated list of preferred streaming platforms. Example: Netflix, Hulu, Amazon Prime'
    ),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A comma-separated list of recommended titles based on the viewing history and preferences.'
    ),
  reasoning: z
    .string()
    .describe(
      'A brief explanation of why these titles were recommended, based on the viewing history.'
    ),
});

export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Based on the user's viewing history and preferences, provide a list of recommended titles.

Viewing History: {{{viewingHistory}}}
Content Type: {{{contentType}}}
Streaming Platform Preferences: {{{streamingPlatformPreferences}}}

Provide the recommendations as a comma-separated list, and briefly explain why these titles were recommended based on the viewing history.

Recommendations:`,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
