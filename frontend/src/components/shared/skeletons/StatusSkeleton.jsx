import React from 'react'

const StatusSkeleton = () => {
  return (
    <div className='bg-gray-100 p-2 animate-shimmer shadow-xl'>
        <div className='flex items-center justify-around'>
            <div className='bg-gray-200 animate-shimmer rounded-full w-20 h-20'>
                <div className='bg-gray-100 mt-1.5 ml-1.5 animate-shimmer rounded-full w-17 h-17' />
            </div>

            <div className='flex flex-col items-center'>
                <div className='bg-gray-200 animate-shimmer h-5 w-10 mb-2'/>
                <div className='bg-gray-200 animate-shimmer h-5 w-20'/>
            </div>

        </div>

    </div>
  )
}

export default StatusSkeleton