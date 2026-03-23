import { useActivityLogs } from "@/queries/activity.query";
import { useUsers } from "@/queries/users.query";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useTasks } from "@/queries/tasks.query";

export const useActivityDetails = () => {
  const { data: activityLogs } = useActivityLogs();
  const { data: allUsers } = useUsers();
  const { data: allWorkspaces } = useWorkspaces();
  const { data: allTasks } = useTasks();

  const formattedActivities = activityLogs?.data?.map((activity) => {
    const user = allUsers?.find(
      (u) => u.id === activity.user_id
    );

    const username = user
      ? `${user.first_name} ${user.last_name}`
      : "Unknown User";

    let itemName = "Unknown";

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

    if (activity.details?.workspace_name) {
      description += ` "${activity.details.workspace_name}"`;
    }

    const date = new Date(activity.created_at).toLocaleString();

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
    raw: { activityLogs, allUsers, allTasks, allWorkspaces },
  };
};