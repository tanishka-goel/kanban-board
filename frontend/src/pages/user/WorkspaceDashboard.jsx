import { useVisibleWorkspace } from "@/hooks/useVisibleWorkspaces";
import React from "react";
import { useParams } from "react-router-dom";
import { useDragCardMutation, useTasks } from "@/queries/tasks.query";
import { useUsers } from "@/queries/users.query";
import { DndContext } from "@dnd-kit/core";
import BoardColumns from "@/components/user/board/BoardColumns";
import Header from "@/components/shared/Header";
import BoardSkeleton from "@/components/shared/skeletons/BoardSkeleton";
import HeaderSkeleton from "@/components/shared/skeletons/HeaderSkeleton";

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

  // console.log("Tasks", taskData);
  // console.log("Tasks 1 data", taskData?.[0]?.data);

  //const memberDetails = useMemberDetails()
  //   console.log("vw in wd", visibleWorkspaces);
  //   console.log("user in wd", user);
  //   console.log("ID from URL:", workspaceId);

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
      existingData: draggedTask?.data,
    });
  };

  return (
    <div className="p-2">
      <Header header={"Workspace details"} />
      <div className="mt-5 bg-white rounded-2xl shadow-2xl p-2 w-full">
        <h1 className="text-lg font-semibold">
         Workspace Name : {currentWorkspace?.workspace_name}
        </h1>
        <h2 className="text-md text-gray-500  font-semibold">
          Created by : {currentWorkspace?.creatorName}{" "}
        </h2>
      </div>

{/* <BoardSkeleton/> */}
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
