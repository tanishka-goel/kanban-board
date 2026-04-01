import React from 'react'

const SidebarSkeleton = () => {
  return (
    <div>
        <div className='bg-gray-800 h-full animate-shimmer p-2 w-full rounded-2xl'>
            <br />
            <div className='bg-gray-200 animate-shimmer rounded-2xl p-2 w-full h-8'></div>
            <br /><br />
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className='bg-gray-200 animate-shimmer w-full h-15  my-3 rounded-2xl'></div>
          ))}
          
        </div>
    </div>
  )
}

export default SidebarSkeleton