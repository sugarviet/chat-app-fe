'use client'
import React from 'react'
import ConversationCard from './components/ConversationCard'
import useConversations from '@/hooks/useConversations'
import { useAuthStore } from '@/store/auth.store';
import { useChatStore } from '@/store/chat.store';

const ConversationList = () => {
  const { data, isLoading } = useConversations();
  const user = useAuthStore((s) => s.user)
  const activeConversation = useChatStore((s) => s.activeConversation)
  const setActiveConversation = useChatStore((s) => s.setActiveConversation)

  if (isLoading) return <>Loading...</>

  return (
    <div className='flex flex-col gap-1 p-2'>
      {data?.map(conv => (
        <ConversationCard
          key={conv.id}
          conversation={conv}
          currentUserId={user?.id}
          isActive={activeConversation?.id === conv.id}
          onClick={() => setActiveConversation(conv)}
        />
      ))}
    </div>
  )
}

export default ConversationList