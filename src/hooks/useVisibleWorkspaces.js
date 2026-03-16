import { useSelector } from "react-redux";
import { useWorkspaces } from "@/queries/workspaces.query";

export const useVisibleWorkspace = () =>{
  const { user, role,isLoading:authLoading , error } = useSelector((state) => state.auth);
  const { data: workspace, isLoading: workspaceLoading } = useWorkspaces();

  const currentUserID = user.id;

  const visibleWorkspaces = workspace?.data?.filter((ws)=>{
    const w = ws.data;
      return (
        w.creatorID === currentUserID ||
        w.members?.includes(currentUserID)
      );
  }) || []

  return {
    visibleWorkspaces, authLoading, workspaceLoading, error, user, role
  }

}