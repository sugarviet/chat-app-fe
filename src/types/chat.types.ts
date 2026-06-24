import type { z } from 'zod';
import type { chatSchema } from '@/lib/validations/chat';

export type ChatForm = z.infer<typeof chatSchema>;

export type ChatResponse = {
  msg: string,
  userId: string
}