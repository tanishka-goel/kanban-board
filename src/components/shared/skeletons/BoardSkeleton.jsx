import React from 'react'

const BoardSkeleton = () => {
  return (
    <div className='bg-gray-50 animate-shimmer rounded-2xl p-2'>
        <div className='grid grid-cols-4  gap-4'>
             {Array.from({ length: 4 }).map((_, index) => (
              <div className='h-auto w-75 p-2 rounded-2xl animate-shimmer bg-gray-100'>
                <div className='bg-gray-200 p-3 h-13 rounded-2xl w-full '/> <br />
                <div className='bg-gray-50 animate-shimmer rounded-xl shadow-2xl w-full h-30' /> <br />
                <div className='bg-gray-50 animate-shimmer rounded-xl shadow-2xl w-full h-30' /> <br />
                <div className='bg-gray-50 animate-shimmer rounded-xl shadow-2xl w-full h-30' /> <br />
                <div className='bg-gray-50 animate-shimmer rounded-xl shadow-2xl w-full h-30' />
              </div>
            ))}
           
        </div>
    </div>
  )
}

export default BoardSkeleton