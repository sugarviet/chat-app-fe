'use client';

import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

import { ChatForm } from '@/types/chat.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { chatSchema } from '@/lib/validations/chat';
import { useChatStore } from '@/store/chat.store';
import { chatService } from '@/services/chat.service';

const MessageInput = () => {
  const activeConversation = useChatStore((s) => s.activeConversation)
  const { control, handleSubmit, reset } = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
    defaultValues: { msg: '', conversationId: '' },
  })

  const onSubmit = (data: ChatForm) => {
    if (!activeConversation) return
    chatService.sendMsg({ ...data, conversationId: activeConversation.id })
    reset({ msg: '', conversationId: activeConversation.id })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <div className="p-3 border-t">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end gap-2">
          <Controller
            name='msg'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-valid={fieldState.invalid} className="flex-1">
                <Textarea
                  {...field}
                  placeholder='Aa'
                  rows={1}
                  className="resize-none min-h-10 max-h-30"
                  onKeyDown={handleKeyDown}
                />
              </Field>
            )}
          />
          <Button type='submit' size="icon" className="rounded-full shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput