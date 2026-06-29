import api from "@/lib/api";
import { getSocket } from "@/lib/socket"
import { ChatForm, ChatResponse, Conversation } from "@/types/chat.types"

export const chatService = {
  sendMsg: (msg: ChatForm) => {
    getSocket().emit('send_message', msg);
  },

  onReceiveMsg: (callback: (msg: ChatResponse) => void) => {
    getSocket().on('receive_message', callback);
  },

  offReceiveMsg: () => {
    getSocket().off('receive_message');
  },

  getConversations:async(): Promise<Conversation[]> => {
    const response = await api.get<Conversation[]>('/conversations');

    return response.data;
  },
  getMessages: async(conversationId: string):Promise<ChatResponse[]> => {
    const response = await api.get<ChatResponse[]>(`/conversations/${conversationId}/messages`)

    return response.data;
  }
}
