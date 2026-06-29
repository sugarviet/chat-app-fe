import { create } from 'zustand';
import { Conversation } from '@/types/chat.types';

interface ChatState {
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  activeConversation: null,
  setActiveConversation: (conversation) => set({ activeConversation: conversation }),
}));
