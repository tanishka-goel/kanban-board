import { useVisibleWorkspace } from "@/hooks/useVisibleWorkspaces";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDragCardMutation, useTasks } from "@/queries/tasks.query";
import { useUsers } from "@/queries/users.query";
import { DndContext } from "@dnd-kit/core";
import BoardColumns from "@/components/user/board/BoardColumns";
import BoardSkeleton from "@/components/shared/skeletons/BoardSkeleton";
import HeaderSkeleton from "@/components/shared/skeletons/HeaderSkeleton";
import { ChevronRight } from "lucide-react";

const WorkspaceDashboard = () => {
  const { workspaceId } = useParams();
  const { user, role, visibleWorkspaces, workspace, workspaceLoading } =
    useVisibleWorkspace();
  const { data: taskResponse } = useTasks();
  const { data: usersResponse } = useUsers();
  const { mutate: updateTaskStatusMutation } = useDragCardMutation();

  const taskData = taskResponse?.filter(
    (task) => task.workspace_id === workspaceId,
  );

  const users = usersResponse ?? [];
  const assigneeById = new Map(
    users.map((userRecord) => {
      const firstName = userRecord?.first_name ?? "";
      const lastName = userRecord?.last_name ?? "";
      const fullName = `${firstName} ${lastName}`.trim();
      return [userRecord.id, fullName];
    }),
  );


  const workspaceList = role === "admin" ? workspace : visibleWorkspaces;

  const currentWorkspace = workspaceList?.find(
    (cw) => cw.id === workspaceId,
  );

  if (workspaceLoading) {
    return (
    <div className="p-4">
      <HeaderSkeleton/> <br />
      <BoardSkeleton/>
    </div>);
  }

  if (!currentWorkspace) {
    return <div>Workspace not found.</div>;
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

  const handleDrag = (e) => {
    const { active, over } = e;

    if (!over) return;

    const taskId = active.id;
    const updatedTaskId = over.id;

    const draggedTask = taskData?.find((t) => t.id === taskId);
    if (draggedTask?.data?.status === updatedTaskId) return;

    updateTaskStatusMutation({
      taskId: taskId,
      updatedTaskId: updatedTaskId,
      existingData: draggedTask,
    });
  };

  const basePath = role ==="admin"? "/admin/all-workspaces":"/your-workspaces"

  return (
    <div className="p-2">

      <div className="flex items-center gap-3">
    
       <h1 className="text-gray-500 font-medium hover:text-gray-600"><Link to={`${basePath}`}>Workspace</Link></h1>
       <h1><ChevronRight size={17} className="text-gray-500"/></h1>
        <h1 className="text-gray-600 font-medium"> {currentWorkspace?.workspace_name}</h1>
      </div>
     
      {/* <div className="mt-5 bg-white rounded-2xl shadow-2xl p-2 w-full">
        <h1 className="text-lg font-semibold">
         Workspace Name : {currentWorkspace?.workspace_name}
        </h1>
        <h2 className="text-md text-gray-500  font-semibold">
          Created by : {currentWorkspace?.creatorName}{" "}
        </h2>
      </div> */}

      <div className="p-2 mt-4 bg-gray-100 h-screen rounded-2xl">
        <DndContext onDragEnd={handleDrag}>
          <div className="grid md:grid-cols-4 gap-4">
            {Headers.map((header) => {
              const columnTasks = taskData?.filter(
                (task) => task.status === header.id,
              );

              return (
                <BoardColumns
                  header={header}
                  columnTasks={columnTasks}
                  assigneeById={assigneeById}
                  workspaceName={currentWorkspace.workspace_name}
                  workspaceId={currentWorkspace.id}          
                  workspaceMembers={currentWorkspace.members}
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
