'use server';

/**
 * @fileOverview A flow to generate an initial AI persona based on a single sentence.
 *
 * - generateInitialPersona - A function that generates the initial AI persona.
 * - GenerateInitialPersonaInput - The input type for the generateInitialPersona function.
 * - GenerateInitialPersonaOutput - The return type for the generateInitialPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialPersonaInputSchema = z.object({
  userDescription: z
    .string()
    .describe('A single sentence describing the desired AI persona.'),
});
export type GenerateInitialPersonaInput = z.infer<typeof GenerateInitialPersonaInputSchema>;

const GenerateInitialPersonaOutputSchema = z.object({
  tone: z.string().describe('The tone of the AI persona.'),
  gender: z.string().describe('The gender of the AI persona.'),
  relationship: z.string().describe('The relationship of the AI persona to the user.'),
  behavioralDescription: z
    .string()
    .describe('A detailed description of the AI persona behavior.'),
});
export type GenerateInitialPersonaOutput = z.infer<typeof GenerateInitialPersonaOutputSchema>;

export async function generateInitialPersona(
  input: GenerateInitialPersonaInput
): Promise<GenerateInitialPersonaOutput> {
  return generateInitialPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialPersonaPrompt',
  input: {schema: GenerateInitialPersonaInputSchema},
  output: {schema: GenerateInitialPersonaOutputSchema},
  prompt: `You are an expert AI persona generator.  Based on the user's single sentence description, you will create a detailed AI persona.

  The persona should have a tone, gender, relationship to the user, and a detailed behavioral description.

  User Description: {{{userDescription}}}
  `,
});

const generateInitialPersonaFlow = ai.defineFlow(
  {
    name: 'generateInitialPersonaFlow',
    inputSchema: GenerateInitialPersonaInputSchema,
    outputSchema: GenerateInitialPersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
