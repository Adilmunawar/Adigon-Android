// Enhance the user's prompt using the AI Partner's persona and conversation history.

'use server';

/**
 * @fileOverview This file contains the enhancePromptFlow, which enhances user prompts using the AI Partner's persona and conversation history.
 *
 * - enhancePrompt: A function that enhances the prompt.
 * - EnhancePromptInput: The input type for the enhancePrompt function.
 * - EnhancePromptOutput: The return type for the enhancePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePromptInputSchema = z.object({
  userInput: z.string().describe('The user input to be enhanced.'),
  aiPartnerPersona: z.string().describe('The persona of the AI partner.'),
  conversationHistory: z.string().describe('The conversation history.'),
});
export type EnhancePromptInput = z.infer<typeof EnhancePromptInputSchema>;

const EnhancePromptOutputSchema = z.object({
  enhancedPrompt: z.string().describe('The enhanced prompt.'),
});
export type EnhancePromptOutput = z.infer<typeof EnhancePromptOutputSchema>;

export async function enhancePrompt(input: EnhancePromptInput): Promise<EnhancePromptOutput> {
  return enhancePromptFlow(input);
}

const enhancePromptPrompt = ai.definePrompt({
  name: 'enhancePromptPrompt',
  input: {schema: EnhancePromptInputSchema},
  output: {schema: EnhancePromptOutputSchema},
  prompt: `You are an expert prompt engineer. Your task is to enhance the given user input to create a more effective prompt for a large language model.

  Consider the AI partner's persona and the conversation history to create a prompt that will elicit a relevant and informative response.

  AI Partner Persona: {{{aiPartnerPersona}}}
  Conversation History: {{{conversationHistory}}}
  User Input: {{{userInput}}}

  Enhanced Prompt:`,
});

const enhancePromptFlow = ai.defineFlow(
  {
    name: 'enhancePromptFlow',
    inputSchema: EnhancePromptInputSchema,
    outputSchema: EnhancePromptOutputSchema,
  },
  async input => {
    const {output} = await enhancePromptPrompt(input);
    return output!;
  }
);
