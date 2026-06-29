'use client'
import useFetch from './useFetch'
import { ChatResponse } from '@/types/chat.types'

type UseMessageType = {
  conversationId: string
}

const useMessage = ({conversationId}: UseMessageType) => {
  return useFetch<ChatResponse[]>({
    url: `/conversations/${conversationId}/messages`,
    options: { enabled: !!conversationId }
  });
}

export default useMessage