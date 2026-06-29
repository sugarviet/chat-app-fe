'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useChatStore } from '@/store/chat.store'
import useMessage from '@/hooks/useMessage'
import MessageBubble from '../MessageBubble'
import { chatService } from '@/services/chat.service'
import { ChatResponse } from '@/types/chat.types'
import { connectSocket } from '@/lib/socket'

const MessageList = () => {
  const user = useAuthStore((s) => s.user)
  const activeConversation = useChatStore((s) => s.activeConversation)
  const conversationId = activeConversation?.id ?? ''

  const { data: historical, isLoading } = useMessage({ conversationId })
  const [realtimeMessages, setRealtimeMessages] = useState<ChatResponse[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setRealtimeMessages([])
    connectSocket()
    chatService.onReceiveMsg((msg) => {
      if (msg.conversationId === conversationId) {
        setRealtimeMessages((prev) => [...prev, msg])
      }
    })
    return () => chatService.offReceiveMsg()
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [historical, realtimeMessages])

  const seenIds = new Set(historical?.map((m) => m.id) ?? []);
  const uniqueRealtime = realtimeMessages.filter((m) => !seenIds.has(m.id));
  const messages = [...(historical ?? []), ...uniqueRealtime];

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Chọn một cuộc trò chuyện để bắt đầu
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Đang tải...
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 p-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isMine={msg.senderId === user?.id}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList