import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-persona.ts';
import '@/ai/flows/summarize-conversation.ts';
import '@/ai/flows/enhance-prompt.ts';
import '@/ai/flows/generate-code-from-description.ts';