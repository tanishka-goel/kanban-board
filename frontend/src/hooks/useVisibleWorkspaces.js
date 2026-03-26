import { useSelector } from "react-redux";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useUsers } from "@/queries/users.query";

export const useVisibleWorkspace = () =>{
  const { user, role,isLoading:authLoading , error } = useSelector((state) => state.auth);
  const { data: workspace, isLoading: workspaceLoading } = useWorkspaces();
  const { data:allUsers} = useUsers()

  const getMemberIds = workspace?.map((ws)=>{return ws.members})
  const currentUserID = user?.id;
  //console.log("cu", currentUserID)

const showMembers = allUsers
  ?.filter((au) => getMemberIds?.flat().includes(au.id))
  ?.map((au) => ` ${au.first_name} ${au.last_name} ,`)

//console.log("mem", showMembers)

  const visibleWorkspaces = workspace?.filter((ws)=>{
    const w = ws;
      return (
        w.creatorID === currentUserID ||
        w.members?.includes(currentUserID)
      );
  }) || []

  return {
    visibleWorkspaces, authLoading, workspaceLoading, error, user, role, showMembers, workspace
  }

}