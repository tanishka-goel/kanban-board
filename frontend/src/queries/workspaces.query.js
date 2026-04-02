import { createNotifications } from "@/api/notifications.api";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "@/api/workspaces.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userdata) => {
      return createWorkspace(userdata);
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      try {
        const createdId = data?.id || data?.[0]?.id;
        const members = variables.members || [];

        const notifPromise = members
          ?.filter((memId) => memId !== variables.creator_id)
          ?.map((memId) =>
            createNotifications({
              user_id: memId,
              actor_id: variables.createdId, // assignor
              type: "workspace_added",
              entity_type: "workspace",
              entity_id: createdId,
              workspace_id: createdId,
              title: "Joined workspace",
              description: `added you in ${variables.workspace_name}`,
            }),
          );

          console.log(" notif data in ws ", data)

        await Promise.all(notifPromise);
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } catch (err) {
        console.log(
          "Error in workspace addition from create workspace query fn",
          err,
        );
      }
    },
  });
};

export const useEditWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace Deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete workspace");
    },
  });
};
