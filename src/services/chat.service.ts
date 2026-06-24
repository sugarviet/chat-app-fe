import { getSocket } from "@/lib/socket"
import { ChatForm, ChatResponse } from "@/types/chat.types"

export const chatService = {
  sendMsg: (msg: ChatForm) => {
    getSocket().emit('send_message', msg);
  },

  onReceiveMsg: (callback: (msg: ChatResponse) => void) => {
    getSocket().on('receive_message', callback);
  },

  offReceiveMsg: () => {
    getSocket().off('receive_message');
  }
}
