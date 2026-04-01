import React from 'react'
import SidebarSkeleton from './SidebarSkeleton'
import ChatAreaSkeleton from './ChatAreaSkeleton'

const ChatLayoutSkeleton = () => {
  return (
    <div>
        
  <div className='flex h-full min-h-0 overflow-hidden items-stretch'>
      <div className="transition-all duration-300 bg-gray-50/60 w-1/4 h-full min-h-0">
        <SidebarSkeleton/>
       
      </div>

    <div className="transition-all duration-300 h-full w-3/4 min-h-0 bg-gray-50/70">
  <ChatAreaSkeleton />

      </div>
    </div>
    
  
    </div>
  )
}

export default ChatLayoutSkeleton