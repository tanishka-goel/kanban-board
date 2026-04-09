import { useActivityLogs } from "@/queries/activity.query";
import { useUsers } from "@/queries/users.query";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useTasks } from "@/queries/tasks.query";

const fieldLabels = {
  title: "Title",
  description: "Description",
  status: "Status",
  priority: "Priority",
  due_date: "Due Date",
  assigned_user_id: "Assignee",
};

const normalizeDetailValue = (value) => {
  if (value === null || value === undefined) return "None";

  if (typeof value === "object") {
    if ("to" in value && value.to !== undefined && value.to !== null) {
      return normalizeDetailValue(value.to);
    }

    if ("from" in value && value.from !== undefined && value.from !== null) {
      return normalizeDetailValue(value.from);
    }

    return "None";
  }

  return String(value);
};

export const useActivityDetails = () => {
  const { data: activityLogs, isLoading: isActivityLogsLoading } =
    useActivityLogs();
  const { data: allUsers, isLoading: isUsersLoading } = useUsers();
  const { data: allWorkspaces, isLoading: isWorkspacesLoading } =
    useWorkspaces();
  const { data: allTasks, isLoading: isTasksLoading } = useTasks();

  // console.log("get activity logs", activityLogs.data)
  // console.log("get all users", allUsers)

  const loading =
    isActivityLogsLoading ||
    isUsersLoading ||
    isWorkspacesLoading ||
    isTasksLoading;

  const formattedActivities = activityLogs?.data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    ?.map((activity) => {
      const user = allUsers?.find((u) => u.id === activity.user_id);
      const date = activity.created_at;

      const username = user
        ? `${user.first_name} ${user.last_name}`
        : "Unknown User";

      let itemName = "";

      if (activity.entity_type === "Workspace") {
        const ws = allWorkspaces?.find((w) => w.id === activity.entity_id);
        itemName = ws?.workspace_name;
      }

      if (activity.entity_type === "Task") {
        const task = allTasks?.find((t) => t.id === activity.entity_id);
        itemName = task?.title ?? normalizeDetailValue(activity.details?.title);

        if (!itemName || itemName === "None") {
          itemName = "Deleted Task";
        }
      }

      let description = "";
      let changes = [];

      if (activity.action === "created") {
        description = `created ${activity.entity_type}`;
      }

      if (activity.action === "updated") {
        changes = Object.entries(activity.details ?? {})
          .filter(
            ([key, val]) =>
              fieldLabels[key] &&
              val?.from !== undefined &&
              val?.to !== undefined,
          )
          .map(([key, val]) => {
            let fromVal = normalizeDetailValue(val.from);
            let toVal = normalizeDetailValue(val.to);

            if (key === "assigned_user_id") {
              const fromUser = allUsers?.find(
                (u) => String(u.id) === String(normalizeDetailValue(val.from)),
              );
              const toUser = allUsers?.find(
                (u) => String(u.id) === String(normalizeDetailValue(val.to)),
              );

              fromVal = fromUser
                ? `${fromUser.first_name} ${fromUser.last_name}`
                : "Unassigned";

              toVal = toUser
                ? `${toUser.first_name} ${toUser.last_name}`
                : "Unassigned";
            }

            return {
              field: fieldLabels[key],
              from: fromVal,
              to: toVal,
            };
          });
        description = `Updated ${activity.entity_type}`;
      }

      if (activity.action === "deleted") {
        description = `Deleted ${activity.entity_type} `;
      }

      if (activity.details?.workspace_name) {
        description += ` "${activity.details.workspace_name}" `;
      }

      return {
        id: activity.id,
        user: username,
        action: activity.action,
        item: itemName,
        description,
        changes,
        date,
      };
    });

  return {
    activities: formattedActivities,
    loading,
    raw: { activityLogs, allUsers, allTasks, allWorkspaces },
  };
};
