import React from "react";
import { StarfieldBackground } from "@/components/ui/starfield";
import { useVisibleWorkspace } from "@/hooks/useVisibleWorkspaces";
import Header from "@/components/shared/Header";
import StatusCard from "@/components/StatusCard";
import { CheckCheck, Clock3, ListCheck, ListTodo } from "lucide-react";
import WorkspaceCard from "@/components/user/WorkspaceCard";
import { useDisplayTasks } from "@/hooks/useDisplayTasks";

const taskStatus = [
  { key:"todo",status: "To do", icon: <ListTodo size={35} />, color: "text-red-500 bg-red-50",col:"text-red-500" },
  {
     key:"in_progress",
    status: "In Progress",
    icon: <Clock3 size={35} />,
    color: "text-yellow-500 bg-yellow-50",
    col:"text-yellow-500"
  },
  {
     key:"completed",
    status: "Completed",
    icon: <CheckCheck size={35} />,
    color: "text-green-500 bg-green-50",
    col:"text-green-500"
  },
  {
     key:"in_review",
    status: "In Review",
    icon: <ListCheck size={35} />,
    color: "text-blue-500 bg-blue-50",
    col:"text-blue-500"
  },
];

const AdminDashboard = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const {countCompleted, countInProgress, countInReview, countTodo} = useDisplayTasks()

  const counts = {
  todo: countTodo,
  in_progress: countInProgress,
  completed: countCompleted,
  in_review: countInReview,
};

  const { workspace, workspaceLoading, authLoading, user } =
    useVisibleWorkspace();

  //console.log("Workspace: ", workspace);

  return (
    <div className="p-2">
      <div className="relative w-full rounded-2xl h-30 overflow-hidden shadow-lg shadow-gray-400 border-8 border-blue-200">
        <StarfieldBackground contained />
        <div className="relative z-10 p-5">
          <p className="text-white text-sm">{formattedDate}</p>
          <h1 className="text-2xl text-white font-semibold">
            Hello, {user?.first_name} {user?.last_name}
          </h1>
        </div>
      </div>

      <div className="py-5">
        <Header header={"Task Status"} />

        <div className="grid grid-cols-2 mt-5 md:grid-cols-4 gap-5">
          {taskStatus?.map((item, index) => {
            return (
              <div key={index}>
                <StatusCard
                stats={counts[item.key]}
                  icon={item.icon}
                  color={item.color}
                  status={item.status}
                  col={item.col}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-5">
        <Header header={"All workspaces"} />

        <div className="h-135 mt-5 overflow-auto w-150">
          {workspace?.map((ws) => {
            return (
              <div key={ws.id}>
                <WorkspaceCard key={ws.id} data={ws}/>
                {/* <h1>{ws.workspace_name}</h1> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
