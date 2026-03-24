import React from 'react'

const HeaderSkeleton = ({
    rightpart = false
}) => {
  return (
    <div className='bg-gray-50 animate-shimmer p-3'>
        <div className='flex items-center justify-between'>
            <div className='bg-gray-200 animate-shimmer rounded-lg w-43 h-10'>
                <div className='bg-gray-100 animate-shimmer' />
            </div>

            {rightpart? 
           (<div className='flex justify-end gap-3 items-center'>
            <div className='bg-gray-200 h-7 animate-shimmer rounded-lg w-43' />
             <div className='bg-gray-200 h-7 animate-shimmer rounded-lg w-43' />
              <div className='bg-gray-200 h-7 animate-shimmer rounded-lg w-43' />

           </div>)
            :
            (<div></div>)
            }

        </div>
    </div>
  )
}

export default HeaderSkeleton