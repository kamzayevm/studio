'use server';

/**
 * @fileOverview A flow that analyzes Hacker News story comments and suggests relevant sources.
 *
 * - suggestRelevantSources - A function that handles the suggestion of relevant sources.
 * - SuggestRelevantSourcesInput - The input type for the suggestRelevantSources function.
 * - SuggestRelevantSourcesOutput - The return type for the suggestRelevantSources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantSourcesInputSchema = z.object({
  storyTitle: z.string().describe('The title of the Hacker News story.'),
  comments: z.array(z.string()).describe('The comments on the Hacker News story.'),
});
export type SuggestRelevantSourcesInput = z.infer<typeof SuggestRelevantSourcesInputSchema>;

const SuggestRelevantSourcesOutputSchema = z.object({
  relevantSources: z.array(z.string()).describe('A list of relevant sources or articles.'),
});
export type SuggestRelevantSourcesOutput = z.infer<typeof SuggestRelevantSourcesOutputSchema>;

export async function suggestRelevantSources(input: SuggestRelevantSourcesInput): Promise<SuggestRelevantSourcesOutput> {
  return suggestRelevantSourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantSourcesPrompt',
  input: {schema: SuggestRelevantSourcesInputSchema},
  output: {schema: SuggestRelevantSourcesOutputSchema},
  prompt: `You are an AI research assistant that provides a list of relevant sources and articles based on Hacker News story's title and comments.

  Story Title: {{{storyTitle}}}
  Comments: {{#each comments}}{{{this}}}\n{{/each}}

  Based on the story and its comments, suggest other relevant sources or articles that might be helpful to further understand the topic. Return a list of relevant sources. Focus on high-quality, informative sources.
  `,
});

const suggestRelevantSourcesFlow = ai.defineFlow(
  {
    name: 'suggestRelevantSourcesFlow',
    inputSchema: SuggestRelevantSourcesInputSchema,
    outputSchema: SuggestRelevantSourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
