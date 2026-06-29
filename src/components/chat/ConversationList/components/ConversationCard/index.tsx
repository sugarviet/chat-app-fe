import React from 'react'
import Image from 'next/image'
import { Conversation } from '@/types/chat.types'
import { cn } from '@/lib/utils'

type ConversationCardTypes = {
  conversation: Conversation,
  currentUserId: string | undefined,
  isActive?: boolean,
  onClick?: () => void
}

const ConversationCard = (props: ConversationCardTypes) => {
  const { onClick, isActive, conversation, currentUserId } = props;
  const other = conversation.participants.find(u => u.id !== currentUserId);

  const preview = conversation.lastMessage
    ? conversation.lastMessage.senderId === currentUserId
      ? `Bạn: ${conversation.lastMessage.msg}`
      : conversation.lastMessage.msg
    : 'Chưa có tin nhắn'

  const formattedTime = new Date(conversation.updatedAt).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div onClick={onClick} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent", isActive && "bg-accent")}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
        {other?.avatar
          ? <Image src={other.avatar} alt={other.name ?? other.email ?? ''} width={40} height={40} className="rounded-full object-cover" />
          : <span>{(other?.name ?? other?.email)?.[0].toUpperCase()}</span>
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium truncate">{other?.name ?? other?.email}</span>
          <span className="text-xs text-muted-foreground shrink-0">{formattedTime}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{preview}</p>
      </div>
    </div>
  )
}

export default ConversationCard