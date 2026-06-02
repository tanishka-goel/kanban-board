import { useSelector } from "react-redux";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useUsers } from "@/queries/users.query";

export const useVisibleWorkspace = () => {
  const {
    user,
    role,
    isLoading: authLoading,
    error,
  } = useSelector((state) => state.auth);
  const { data: workspace, isLoading: workspaceLoading } = useWorkspaces();
  const { data: allUsers } = useUsers();

 
  const currentUserID = user?.id;



  const visibleWorkspaces =
    workspace?.filter((ws) => {
      const w = ws;
      return (
        w.creatorID === currentUserID || w.members?.includes(currentUserID)
      );
    }) || [];

  return {
    visibleWorkspaces,
    authLoading,
    workspaceLoading,
    error,
    user,
    role,
    workspace,
  };
};
