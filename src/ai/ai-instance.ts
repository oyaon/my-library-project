import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: 'AIzaSyBPxNCPcyJEwuB8gszx3mwTI-amEYovuQI',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});

