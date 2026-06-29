'use client'
import useFetch from './useFetch';
import { Conversation } from '@/types/chat.types';

const useConversations = () => {
  const {data, isLoading, isPending} = useFetch<Conversation[]>({
    url: 'conversations'
  })
  return {
    data,
    isLoading,
    isPending
  }
}

export default useConversations