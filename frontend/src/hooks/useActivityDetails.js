import { useActivityLogs } from "@/queries/activity.query";
import { useUsers } from "@/queries/users.query";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useTasks } from "@/queries/tasks.query";

export const useActivityDetails = () => {
  const { data: activityLogs, isLoading: isActivityLogsLoading } = useActivityLogs();
  const { data: allUsers, isLoading: isUsersLoading } = useUsers();
  const { data: allWorkspaces, isLoading: isWorkspacesLoading } = useWorkspaces();
  const { data: allTasks, isLoading: isTasksLoading } = useTasks();

  const loading =
    isActivityLogsLoading ||
    isUsersLoading ||
    isWorkspacesLoading ||
    isTasksLoading;

  const formattedActivities = activityLogs?.data
  .sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
  ?.map((activity) => {
    const user = allUsers?.find(
      (u) => u.id === activity.user_id
    );

    const username = user
      ? `${user.first_name} ${user.last_name}`
      : "Unknown User";

    let itemName = "Task";

    if (activity.entity_type === "Workspace") {
      const ws = allWorkspaces?.find(
        (w) => w.id === activity.entity_id
      );
      itemName = ws?.workspace_name;
    }

    if (activity.entity_type === "Task") {
      const task = allTasks?.find(
        (t) => t.id === activity.entity_id
      );
      itemName = task?.title;
    }

    let description = "";

    if (activity.action === "created") {
      description = `created ${activity.entity_type}`;
    }

    if (activity.action === "updated") {
      description = `updated ${activity.entity_type}`;
    }

    if (activity.action === "deleted") {              
        description = `Deleted ${activity.entity_type} "${itemName}"`;
      }

    if (activity.details?.workspace_name) {
      description += ` "${activity.details.workspace_name}"`;
    }

    const date = activity.created_at;
    

    return {
      id: activity.id,
      user: username,
      action: activity.action,
      item: itemName,
      description,
      date,
    };
  });

  return {
    activities: formattedActivities,
    loading,
    raw: { activityLogs, allUsers, allTasks, allWorkspaces },
  };
};