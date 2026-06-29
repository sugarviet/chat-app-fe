import type { z } from 'zod';
import type { chatSchema } from '@/lib/validations/chat';
import { User } from './user.types';

export type ChatForm = z.infer<typeof chatSchema>;

export type ChatResponse = {
  id: string,
  msg: string,
  senderId: string,
  conversationId: string,
  createdAt: string
}

export type Conversation = {
  id: string,
  participants: User[],
  lastMessage?: ChatResponse,
  updatedAt: string,
}