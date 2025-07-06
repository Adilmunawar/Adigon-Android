'use server';
/**
 * @fileOverview Generates code snippets from a natural language description.
 *
 * - generateCode - A function that generates a code snippet from a description.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeInputSchema = z.object({
  description: z.string().describe('A description of the code to generate.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  files: z.array(z.object({
    fileName: z.string().describe("The name of the file."),
    code: z.string().describe("The code content for the file."),
  })).describe("An array of files with their names and code content."),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  prompt: `You are an expert software developer. You will generate one or more code files based on the user's description. The code should be well-formatted and easy to understand. Provide the file name and the code for each file.

If the request can be satisfied with a single file, return a single element in the 'files' array. Name the file appropriately based on the user's request.

Description: {{{description}}}`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
