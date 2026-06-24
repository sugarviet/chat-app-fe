import {useState, useEffect} from 'react'
import { useMutation } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { connectSocket } from '@/lib/socket'
import { ChatForm, ChatResponse } from '@/types/chat.types'

const useSendMessage = () => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);

  useEffect(() => {
    connectSocket();

    chatService.onReceiveMsg((msg) => {
      setMessages(prev => [...prev, msg]);
    })

    return () => chatService.offReceiveMsg();
  }, []);

  const sendMessage = (data: ChatForm) => {
    chatService.sendMsg(data);
  }

  return {
    sendMessage,
    messages
  }
}

export default useSendMessage