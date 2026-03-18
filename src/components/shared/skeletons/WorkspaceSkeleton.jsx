import React from 'react'

const WorkspaceSkeleton = () => {
  return (
    
    <div className='bg-gray-100 animate-pulse mb-3 py-4 px-4 rounded-xl '>

        <div className='flex items-center gap-4'>
             <div className='bg-gray-200 w-100 mt-3 h-5'></div>
             <div className='bg-gray-200 w-40 rounded-2xl mt-3 mr-40 h-5'></div>
        </div>
         <div className='bg-gray-200 w-100 mt-3 h-5'></div>
 <div className='flex items-center gap-4'>
             <div className='bg-gray-200 w-30 mt-3 h-5'></div>
             <div className='bg-gray-200 w-30 rounded-2xl mt-3 mr-40 h-5'></div>
        </div>
        <div className='flex items-center gap-4'>
             <div className='bg-gray-200 w-30 mt-3 h-5'></div>
             <div className='bg-gray-200 w-30 rounded-2xl mt-3 mr-40 h-5'></div>
        </div>
        
    </div>
  )
}

export default WorkspaceSkeleton