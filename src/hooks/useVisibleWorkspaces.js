import { useSelector } from "react-redux";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useUsers } from "@/queries/users.query";

export const useVisibleWorkspace = () =>{
  const { user, role,isLoading:authLoading , error } = useSelector((state) => state.auth);
  const { data: workspace, isLoading: workspaceLoading } = useWorkspaces();
  const { data:allUsers} = useUsers()

  // console.log("All user Deatils", allUsers)
  // console.log("All workspaces details : ", workspace)

  const getwsname = workspace?.map((ws)=> ws.workspace_name)
  //console.log("WS names : ", getwsname)

  const getMemberIds = workspace?.map((ws)=>{return ws.members})
  //console.log("member ids",getMemberIds)

//   const getWorkspaceMembers = (workspace, allUsers) => {
//   return allUsers
//     ?.filter((user) => workspace.members?.includes(user.id))
//     ?.map((user) => `${user.first_name} ${user.last_name}`);
// };

// const names = getWorkspaceMembers(workspace,allUsers)
// console.log("namess", names)

  const currentUserID = user.id;
  //console.log("cu", currentUserID)

const showMembers = allUsers
  ?.filter((au) => getMemberIds?.flat().includes(au.id))
  ?.map((au) => ` ${au.first_name} ${au.last_name} ,`)

//console.log("mem", showMembers)

  const visibleWorkspaces = workspace?.filter((ws)=>{
    const w = ws;
    //console.log("workspace data",w)
      return (
        w.creatorID === currentUserID ||
        w.members?.includes(currentUserID)
      );
  }) || []

  return {
    visibleWorkspaces, authLoading, workspaceLoading, error, user, role, showMembers, workspace
  }

}