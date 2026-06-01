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
          ?.filter((memId) => memId !== variables.creatorID)
          ?.map((memId) =>
            createNotifications({
              user_id: memId,
              actor_id: variables.creatorID, // assignor
              type: "workspace_added",
              entity_type: "workspace",
              entity_id: createdId,
              workspace_id: createdId,
              title: "Joined workspace",
              description: `added you in ${variables.workspace_name}`,
            
            }),
          );

          

        await Promise.all(notifPromise);
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } catch (error) {
        console.log(
          "Error in workspace addition from create workspace query fn",
          error,
        );
      }
    },
  });
};

export const useEditWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkspace,
    onSuccess: async (data,variables) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      try {
        const updatedId = data?.id || data?.[0]?.id;
        const currentMembers = variables.newData?.members || [];
        const previousMembers = variables.previousMembers || [];

        const newlyAddedMembers = currentMembers?.filter(
          (id) => !previousMembers.includes(id) &&
          id !== variables?.newData?.creatorID
      )

      if(newlyAddedMembers.length===0) return;

      const notifPromises = newlyAddedMembers.map((memId) =>
      createNotifications({
        user_id: memId,
        actor_id: variables.newData?.creatorID,
        type: "workspace_added",
        entity_type: "workspace",
        entity_id: updatedId,
        workspace_id: updatedId,
        title: "Joined workspace",
        description: `added you in ${variables.newData?.workspace_name}`,
      })
    );

    await Promise.all(notifPromises);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });


        
      } catch (error) {
        console.log("Error sending workspace notifications", error?.message);
      }
      //  try {
      //   const createdId = data?.id || data?.[0]?.id;
      //   const members = variables.members || [];

      //   const notifPromise = members
      //     ?.filter((memId) => memId !== variables.creatorID)
      //     ?.map((memId) =>
      //       createNotifications({
      //         user_id: memId,
      //         actor_id: variables.creatorID,
      //         type: "workspace_added",
      //         entity_type: "workspace",
      //         entity_id: createdId,
      //         workspace_id: createdId,
      //         title: "Joined workspace",
      //         description: `added you in ${variables.workspace_name}`,
      //       }),
      //     );

      //     console.log(" notif data in ws ", data)

      //   await Promise.all(notifPromise);
      //   queryClient.invalidateQueries({ queryKey: ["notifications"] });
      // } catch (err) {
      //   toast.error("Error in workspace addition from create workspace query fn", err?.message)
      // }
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
      toast.error(error?.response?.data?.error || "Failed to delete workspace. Please ensure there are no tasks in workspace. ");
    },
  });
};
