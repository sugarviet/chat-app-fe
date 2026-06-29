import { ChatResponse } from '@/types/chat.types'
import React from 'react'
import { cn } from '@/lib/utils'

type MessageBubbleProps = {
  message: ChatResponse,
  isMine: boolean
}

const MessageBubble = ({ message, isMine }: MessageBubbleProps) => {
  const time = new Date(message.createdAt).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={cn('flex', isMine ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        'max-w-[70%] px-3 py-2 rounded-2xl text-sm',
        isMine
          ? 'bg-primary text-primary-foreground rounded-br-sm'
          : 'bg-muted rounded-bl-sm'
      )}>
        <p className="whitespace-pre-wrap break-words">{message.msg}</p>
        <span className={cn(
          'text-xs mt-1 block text-right',
          isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'
        )}>
          {time}
        </span>
      </div>
    </div>
  )
}

export default MessageBubble