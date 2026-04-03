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

    let itemName = "";

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
      itemName = task?.title ?? activity.details?.title ?? "Deleted Task";
    }

    let description = "";

    if (activity.action === "created") {
      description = `created ${activity.entity_type}`;
    }

    // if (activity.action === "updated") {
    //   const changes = activity.details;
    //   if(changes && typeof changes === "object" && Object.keys(changes).length > 0){
    //      const changeSummary = Object.entries(changes)
    //   .map(([field, { from, to }]) => {
    //     const label = field.replace(/_id$/, "").replace(/_/g, " ");
    //     if (from && to) return `${label}: "${from}" → "${to}"`;
    //     if (!from && to) return `set ${label} to "${to}"`;
    //     if (from && !to) return `cleared ${label}`;
    //     return `changed ${label}`;
    //   })
    //   .join(", ");
    // description = `Updated ${activity.entity_type} — ${changeSummary}`;
    //   } else{
    //      description = `Updated ${activity.entity_type} — ${changeSummary}`;
    //   }
     
    // }

    if (activity.action === "updated") {

       description = `Updated ${activity.entity_type} "${itemName}"`;
  // const changes = activity.details;
  // if (changes && typeof changes === "object" && Object.keys(changes).length > 0) {
  //   const changeSummary = Object.entries(changes)
  //     .map(([field, { from, to }]) => {
  //       const label = field.replace(/_id$/, "").replace(/_/g, " ");

  //       // Resolve user IDs to names
  //       const resolveValue = (val) => {
  //         if (!val) return null;
  //         const matched = allUsers?.find((u) => u.id === val);
  //         if (matched) return `${matched.first_name} ${matched.last_name}`;
  //         return val;
  //       };

  //       const fromLabel = resolveValue(from);
  //       const toLabel = resolveValue(to);

  //       if (fromLabel && toLabel) return `${label}: "${fromLabel}" → "${toLabel}"`;
  //       if (!fromLabel && toLabel) return `set ${label} to "${toLabel}"`;
  //       if (fromLabel && !toLabel) return `cleared ${label}`;
  //       return `changed ${label}`;
  //     })
  //     .join(", ");
  //   description = `Updated ${activity.entity_type} — ${changeSummary}`;
  // } else {
  //   description = `Updated ${activity.entity_type} "${itemName}"`;
  // }
}

    if (activity.action === "deleted") {              
        description = `Deleted ${activity.entity_type}`;
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