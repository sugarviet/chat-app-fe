import React from 'react'
import { ConversationList, MessageInput, MessageList } from '@/components/chat'

const App = () => {
  return (
    <div className='flex h-screen'>
      <aside className='w-72 border-r flex flex-col'>
        <ConversationList />
      </aside>

      <main className='flex-1 flex flex-col'>
        <MessageList />
        <MessageInput />
      </main>
    </div>
  )
}

export default App