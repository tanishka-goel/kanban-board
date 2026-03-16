import { useVisibleWorkspace } from "@/hooks/useVisibleWorkspaces";
import React from "react";
import { useParams } from "react-router-dom";
import { useMemberDetails } from "@/hooks/useMemberDetails";
import Taskcard from "@/components/board/Taskcard";
import { useDragCardMutation, useTasks } from "@/queries/tasks.query";
import { DndContext } from "@dnd-kit/core";
import BoardColumns from "@/components/board/BoardColumns";

const WorkspaceDashboard = () => {
  const { workspaceId } = useParams();
  const { user, visibleWorkspaces } = useVisibleWorkspace();
  const { data: taskResponse } = useTasks();
  const {mutate:updateTaskStatusMutation} = useDragCardMutation();

  const taskData = taskResponse?.data;

  console.log("Tasks", taskData);
  console.log("Tasks 1 data", taskData?.[0]?.data);

  //const memberDetails = useMemberDetails()
  //   console.log("vw in wd", visibleWorkspaces);
  //   console.log("user in wd", user);
  //   console.log("ID from URL:", workspaceId);

  const currentWorkspace = visibleWorkspaces?.find(
    (cw) => cw.id === workspaceId,
  );
  //console.log("Current Workspace found:", currentWorkspace);

  if (!currentWorkspace) {
    return <div>Loading workspace...</div>;
  }

  const Headers = [
    {
      id: "todo",
      status: "To-do",
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      id: "in_progress",
      status: "In Progress",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
    },
    {
      id: "completed",
      status: "Completed",
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      id: "in_review",
      status: "In Review",
      bgColor: "bg-purple-50",
      textColor: "text-purple-500",
    },
  ];

  const handleDrag = (e) =>{
    const {active, over} = e;

    if(!over) return;

    const taskId = active.id;
    const updatedTaskId = over.id;

    const draggedTask = taskData?.find(t => t.id === taskId);
    if(draggedTask?.data?.status === updatedTaskId) return;

    console.log(`Time to update Task ${taskId} to status: ${updatedTaskId}`);

    updateTaskStatusMutation({
      taskId:taskId,
      updatedTaskId:updatedTaskId,
      existingData:draggedTask?.data
    })
  }

  return (
    <div className="p-2">
      <h1>Workspace Details</h1>
      <div>
        <h1>Name : {currentWorkspace?.data?.workspace_name}</h1>
        <h2>Created by : {currentWorkspace?.data?.creatorName} </h2>
        {/* <h2>Members : </h2> */}
      </div>

      <div className="p-2 mt-4 bg-gray-100 h-screen rounded-2xl">
        
        <DndContext onDragEnd={handleDrag}>
<div className="grid md:grid-cols-4 gap-4">
          {Headers.map((header) => {
            const columnTasks = taskData?.filter(
              (task) => task.data.status === header.id,
            );

            return (
              <BoardColumns 
              header={header} 
              columnTasks={columnTasks}
              key={header.id}
              />
            );
          })}
        </div>
        </DndContext>
        
      </div>
    </div>
  );
};

export default WorkspaceDashboard;
