import React from "react";
import Taskcard from "./Taskcard";
import { useDroppable } from "@dnd-kit/core";

const BoardColumns = ({ header,columnTasks }) => {

    const {setNodeRef, isOver} = useDroppable({
        id: header.id
    })

  return (
    <div 
    ref={setNodeRef}
    key={header.id} 
    className={`bg-white p-3 rounded-xl transition-colors ${isOver ? 'bg-gray-50' : ''}`}
    >
      <h1
        className={`p-3 ${header.bgColor} ${header.textColor} mb-2 border-2 text-center rounded-xl font-bold`}
      >
        {header.status}
      </h1>

      {columnTasks?.map((task) => (
        <Taskcard key={task.id} data={task.data} taskId = {task.id} />
      ))}
    </div>
  );
};

export default BoardColumns;
