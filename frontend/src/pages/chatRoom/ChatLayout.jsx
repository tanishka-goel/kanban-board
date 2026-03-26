import React from 'react'
import UserChats from './UserChats'
import ChatArea from './ChatArea'


const ChatLayout = () => {
   
  return (
   <div className='flex h-screen'>
      <div className='w-1/4 bg-gray-50/60'>
        <UserChats />
      </div>

      <div className='w-3/4  bg-gray-50/70'>
        <ChatArea />
      </div>
    </div>
    
  )
}

export default ChatLayout