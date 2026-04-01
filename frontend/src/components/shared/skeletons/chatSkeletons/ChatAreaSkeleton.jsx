import React from 'react'

const ChatAreaSkeleton = () => {
  return (
    <div>
        <div className='bg-gray-500 animate-shimmer w-full p-2 h-full'>
            <div className='relative bg-gray-100 animate-shimmer  w-full h-15 gap-2'>
                <div className='absolute bg-gray-700 animate-shimmer  mt-1 ml-2 rounded-full w-13 h-13'></div>
                <div className='absolute bg-gray-600 animate-shimmer  w-50 ml-17 rounded-2xl mt-2 h-10'></div>
            </div>
    <br /><br />
            <div className="bg-gray-200 animate-shimmer  w-full p-2 flex flex-col items-end gap-2">
  <div className="bg-gray-400 animate-shimmer  rounded-2xl w-40 h-13"></div>
  <div className="bg-gray-400 animate-shimmer rounded-2xl w-32 h-13"></div>

   <div className="bg-gray-400 self-start animate-shimmer  rounded-2xl w-32 h-13"></div>
    <div className="bg-gray-400 self-start  animate-shimmer rounded-2xl w-100 h-23"></div>

     <div className="bg-gray-400 rounded-2xl animate-shimmer  w-80 h-13"></div>
  <div className="bg-gray-400 rounded-2xl animate-shimmer  w-32 h-13"></div>
   <div className="bg-gray-400 rounded-2xl animate-shimmer  w-40 h-13"></div>
  <div className="bg-gray-400 rounded-2xl animate-shimmer  w-32 h-13"></div>
   <div className="bg-gray-400 self-start animate-shimmer  rounded-2xl w-32 h-13"></div>
</div>


        </div>
    </div>
  )
}

export default ChatAreaSkeleton