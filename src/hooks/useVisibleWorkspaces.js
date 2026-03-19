import { useSelector } from "react-redux";
import { useWorkspaces } from "@/queries/workspaces.query";

export const useVisibleWorkspace = () =>{
  const { user, role,isLoading:authLoading , error } = useSelector((state) => state.auth);
  const { data: workspace, isLoading: workspaceLoading } = useWorkspaces();

  //console.log("visible ws",workspace)

  const currentUserID = user.id;
  //console.log("cu", currentUserID)

  const visibleWorkspaces = workspace?.filter((ws)=>{
    const w = ws;
    //console.log("workspace data",w)
      return (
        w.creatorID === currentUserID ||
        w.members?.includes(currentUserID)
      );
  }) || []

  return {
    visibleWorkspaces, authLoading, workspaceLoading, error, user, role
  }

}