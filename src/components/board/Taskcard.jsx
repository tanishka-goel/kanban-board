import { useDraggable, useDroppable } from '@dnd-kit/core'
import React from 'react'
import { CSS } from '@dnd-kit/utilities';

const Taskcard = ({data, taskId}) => {

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id:taskId
    })
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const headerColor = {
        urgent:{
            divBar:"bg-red-500",
            badge:"bg-red-50 text-red-500"
        },
        high:{
            divBar:"bg-orange-500",
            badge:"bg-orange-50 text-orange-500"
        },
        low:{
            divBar:"bg-blue-500",
            badge:"bg-blue-50 text-blue-500"
        },
        medium:{
            divBar:"bg-yellow-500",
            badge:"bg-yellow-50 text-yellow-500"
        }

    }
    
    const priority = data.priority || "low"
    const colors = headerColor[priority]
    

  return (
    <div 
    ref={setNodeRef}
    style={style}
    {...listeners}
    {...attributes}
    className='cursor-grab p-4 shadow-xl shadow-gray-200 transition-transform duration-500 transform-gpu
      ease-[cubic-bezier(0.25,1,0.5,1)] mb-3 bg-white rounded-xl
      hover:scale-[1.02] md:hover:scale-104 hover:shadow-xl'>
        <div className={`${colors.divBar} mb-2 w-full h-2 rounded-2xl`}></div>
        <h1 className='font-bold text-md tracking-wide'>{data?.title}</h1>
        {/* <p className='font-semibold text-gray-500'>description Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reicie </p> */}
        {/* <p className='font-bold text-secondary'>Assignor : user </p> */}
        <p className='font-bold text-emerald-600'>Assignee : user2 {} </p>
       
        <p className='font-semibold text-gray-700'>Priority : <span className={` ${colors.badge} animate-pulse text-sm p-2 rounded-2xl`}>high</span></p>
         <p className='font-semibold text-gray-500'>Due : {data.due_date.slice(0,10) || "No Due Date"}</p>
    </div>
  )
}

export default Taskcard