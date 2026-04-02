import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "@/api/tasks.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });

     try{
         if (variables.assigned_to && variables.assigned_to !== variables.creator_id) {
        await createNotifications({
          user_id: variables.assigned_to, // assignee
          actor_id: variables.creator_id, // assignor
          type: "task_assigned",
          entity_type: "task",
          entity_id: data?.id || data?.[0]?.id,
          workspace_id: variables.workspace_id,
          title: "Task assigned",
          description: `assigned you to "${variables.title}"`,
        });
        queryClient.invalidateQueries({queryKey:["notifications"]})
      }
     } catch (err){
        console.log("Error in notif creation from create task query fn", err)
     }

    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Task updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update task");
      console.error("Error updating task:", error);
    },
  });
};

export const useDragCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async ({ taskId, updatedTaskId }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks?.map((task) =>
          task.id === taskId ? { ...task, status: updatedTaskId } : task,
        ),
      );

      return { previousTasks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Task status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update task status");
      console.error("Error updating task status:", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete task");
      console.error("Error deleting task :", error);
    },
  });
};
