import React from "react";
import Taskcard from "./Taskcard";
import { useDroppable } from "@dnd-kit/core";

const BoardColumns = ({ header, columnTasks, assigneeById, taskDueDate, workspaceName }) => {

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
        className={`p-3 ${header.bgColor} ${header.textColor} uppercase text-sm mb-2 border-2 text-center rounded-xl font-bold`}
      >
        {header.status}
      </h1>

      {columnTasks?.map((task) => {
        const assigneeName = assigneeById?.get(task.assigned_user_id);
        //const dueDate = taskDueDate?.get(task.due_date)
        //console.log("AN", dueDate)
        return (
          <Taskcard
            key={task.id}
            data={{ ...task, assignee_name: assigneeName, workspace_name: workspaceName }}
            taskId={task.id}
          />
        );
      })}
    </div>
  );
};

export default BoardColumns;
