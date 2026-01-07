'use server';

/**
 * @fileOverview Generates short descriptions for images and charts in PDFs using GenAI.
 *
 * - generateImageDescription - A function that generates a description for an image or chart.
 * - GenerateImageDescriptionInput - The input type for the generateImageDescription function.
 * - GenerateImageDescriptionOutput - The return type for the generateImageDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageDescriptionInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A image or chart, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GenerateImageDescriptionInput = z.infer<typeof GenerateImageDescriptionInputSchema>;

const GenerateImageDescriptionOutputSchema = z.object({
  description: z.string().describe('A short description of the image or chart.'),
});

export type GenerateImageDescriptionOutput = z.infer<typeof GenerateImageDescriptionOutputSchema>;

export async function generateImageDescription(input: GenerateImageDescriptionInput): Promise<GenerateImageDescriptionOutput> {
  return generateImageDescriptionFlow(input);
}

const generateImageDescriptionPrompt = ai.definePrompt({
  name: 'generateImageDescriptionPrompt',
  input: {schema: GenerateImageDescriptionInputSchema},
  output: {schema: GenerateImageDescriptionOutputSchema},
  prompt: `You are an expert in describing images and charts for search indexing.

  Given the following image or chart, create a concise and descriptive text that will help users find it when searching.
  The description should be no more than 2 sentences long.

  Image/Chart: {{media url=imageDataUri}}`,
});

const generateImageDescriptionFlow = ai.defineFlow(
  {
    name: 'generateImageDescriptionFlow',
    inputSchema: GenerateImageDescriptionInputSchema,
    outputSchema: GenerateImageDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateImageDescriptionPrompt(input);
    return output!;
  }
);
