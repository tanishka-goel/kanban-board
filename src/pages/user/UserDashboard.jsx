import PieDonutText from "@/components/charts/pie-donut-text";
import WorkspaceCard from "@/components/charts/WorkspaceCard";
import UserGreeting from "@/components/shared/skeletons/UserGreeting";
import { loginThunk } from "@/features/auth/authSlice";
import { useWorkspaces } from "@/queries/workspaces.query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const { data: workspace, isLoading: workspaceLoading } = useWorkspaces();
  //console.log("Workspace data: ", data);
  // console.log("user: ", user);
  // console.log(user?.first_name);

  // console.log("Error", error)
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentUserID = user.id
  //console.log("User id : ", currentUserID)

 const creatorID = workspace?.data?.[0]?.data?.creatorID
  //console.log("creator id : ", creatorID)

  const memberID = workspace?.data?.[0]?.data?.members
  //console.log("memberID id : ", memberID)

  function hasWorkspaceAccess (ws, userID){
    const workspace = ws.data;
    return (
    workspace.creatorID === userID ||
    workspace.members?.includes(userID)
  );

  }

  const visibleWorkspace = workspace?.data?.filter((ws)=>
  hasWorkspaceAccess(ws,currentUserID)
  ) ||[]

  if (isLoading)
    return (
      <div>
        <UserGreeting />
      </div>
    );
  return (
    <div className="p-2">
      <div className="w-full rounded-2xl h-30 p-5 shadow-lg shadow-gray-400 bg-white border-8 border-blue-200">
        <p className="text-black text-sm">{formattedDate}</p>
        <h1 className="text-2xl text-black font-semibold">
          Hello, {user?.first_name} {user?.last_name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:m-5 m-2 p-2 h-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 my-3 items-center">
            <h1 className="md:text-xl text-md w-fit bg-lime-200/70 p-1 md:mb-3 md:p-2 md:px-4 rounded-4xl font-semibold tracking-wide">
            Your Workspaces
          </h1>
          <p>Sort By: Most Recent</p>
          </div>
          
          <div className="h-110 overflow-y-auto pr-2 custom-scrollbar">
        {visibleWorkspace.map((ws)=>(
          <WorkspaceCard key={ws.id} data={ws}/>
        ))}
    </div>
        </div>

        <div className="w-auto h-auto m-5 p-3 rounded-2xl shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-105">
          <PieDonutText />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
