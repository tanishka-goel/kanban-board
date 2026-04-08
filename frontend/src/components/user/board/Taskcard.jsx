import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Edit, EllipsisVertical, Info, Trash2 } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import AddTaskModal from "../../shared/modals/AddTaskModal";
import { useDeleteTask, useEditTask, useTasks } from "@/queries/tasks.query";
import { toast } from "sonner";
import { format, isValid } from "date-fns";
import DeleteModal from "@/components/shared/modals/DeleteModal";
import TaskDetailsModal from "@/components/shared/modals/TaskDetailsModal";
import { useSelector } from "react-redux";

const Taskcard = ({ data, taskId }) => {
  const [editTaskModal, setEditTaskModal] = useState(false);
  const {user} = useSelector((state)=>state.auth)
  const {data:allTasks} = useTasks()
  const { mutate: editTask } = useEditTask();
  const { mutate: deleteTask } = useDeleteTask();
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [openTaskDetailsModal, setOpenTaskDetailsModal] = useState(false)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: taskId,
  });

 const isCreator = data?.creator_id === user?.id;


  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const headerColor = {
    urgent: {
      divBar: "bg-red-500",
      badge: "bg-red-50 text-red-500",
    },
    high: {
      divBar: "bg-orange-500",
      badge: "bg-orange-50 text-orange-500",
    },
    low: {
      divBar: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-500",
    },
    medium: {
      divBar: "bg-blue-500",
      badge: "bg-blue-50 text-blue-600",
    },
  };

  const priority = data.priority || "low";
  const colors = headerColor[priority];
  const dueDate = data?.due_date ? new Date(data.due_date) : null;
  const dueDateLabel = dueDate && isValid(dueDate)
    ? format(dueDate, "MMM do, yyyy")
    : "No due date assigned";

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="group cursor-grab active:cursor-grabbing 
      p-4 mb-3 rounded-2xl bg-white 
      border border-gray-200/70
      shadow-sm hover:shadow-lg
      transition-all duration-300 ease-out
      hover:-translate-y-1"
      >
        <div
          className={`${colors.divBar} mb-3 w-full h-1.5 rounded-full opacity-80`}
        />

        <div className="flex justify-between">
          <div {...listeners} {...attributes} className="cursor-grab flex-1">
            <h1 className="font-medium text-[15px] text-gray-900 -tracking-normal line-clamp-2">
              {data?.title}
            </h1>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-gray-200 p-1.5 rounded-full">
                  <EllipsisVertical size={15} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white" align="start">
                {isCreator && 
                 <DropdownMenuItem onClick={() => setEditTaskModal(true)}>
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit
                </DropdownMenuItem>
                }
                
                {
                  isCreator &&
                  <DropdownMenuItem onClick={() => setDeleteTaskModal(data.id)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                  Delete
                </DropdownMenuItem>
                }
                

                 <DropdownMenuItem onClick={() => setOpenTaskDetailsModal(data.id)}>
                  <Info className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Assignee:{" "}
          <span className="text-gray-600 font-medium">
            {data.assignee_name || "Unassigned"}
          </span>
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span
            className={`${colors.badge} text-xs px-3 py-1 rounded-full font-semibold capitalize`}
          >
            {priority}
          </span>

          <span className="text-xs text-gray-400">
            Due : {dueDateLabel}
          </span>
        </div>
      </div>
      {editTaskModal && (
        <AddTaskModal
          closeModal={() => setEditTaskModal(false)}
          selectedTask={data}
          onTaskAddition={(newData) =>
            editTask(
              { id: data.id, newData },
              { onSuccess: () => setEditTaskModal(false) }
            )
          }
        />
      )}

      {deleteTaskModal && (
        <DeleteModal
          title={data.title}
          deleteEntity={() => {
            //console.log("Deleting id:", deleteTaskModal); 
            deleteTask(deleteTaskModal, {
              onSuccess: () => {
                setDeleteTaskModal(false);
              },
            });
          }}
          closeModal={() => setDeleteTaskModal(false)}
        />
      )} 

      {openTaskDetailsModal && 
      <TaskDetailsModal
      closeModal={()=>setOpenTaskDetailsModal(false)}
      data={data}
      />}
    </>
  );
};

export default Taskcard;
