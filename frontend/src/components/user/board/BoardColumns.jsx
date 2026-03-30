import React, { useState } from "react";
import Taskcard from "./Taskcard";
import { useDroppable } from "@dnd-kit/core";
import { Cross, Plus } from "lucide-react";
import AddTaskModal from "@/components/shared/modals/AddTaskModal";
import { createTask } from "@/api/tasks.api";
import { toast } from "sonner";

const BoardColumns = ({ header, columnTasks, assigneeById, workspaceName, workspaceId,workspaceMembers }) => {

  const [openTaskModal, setOpenTaskModal] = useState(false)

  const handleTaskAddition = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success("Task created successfully");
      setOpenTaskModal(false);
    } catch (error) {
      console.error("Failed to create task", error);
      toast.error("Failed to create task");
    }
  };

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
        return (
          <Taskcard
            key={task.id}
            data={{ ...task, assignee_name: assigneeName, workspace_name: workspaceName }}
            taskId={task.id}
          />
        );
      })}

     
      {header.id === "todo" && (
  <button

  onClick={() => setOpenTaskModal(true)} 

    className="w-full mt-30 flex items-center justify-center gap-2 
    p-2.5 rounded-xl border-2 border-dashed border-gray-200
    text-gray-500 text-sm font-medium
    hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50
    transition-all duration-200 cursor-pointer group"
  >
    <Plus 
      size={16} 
      className="group-hover:scale-110 transition-transform duration-200" 
    />
    Add Task
  </button>
)}
{openTaskModal && (
  <AddTaskModal
  onTaskAddition={handleTaskAddition}
  closeModal={()=>setOpenTaskModal(false)}
  workspaceId={workspaceId}
  workspaceMembers={workspaceMembers}
  />
)}
     </div>
     
    
  );
};

export default BoardColumns;
