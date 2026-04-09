import { BaseApi } from "./instance/api";
import { createActivityLog } from "./activity.api";
import { createNotifications } from "./notifications.api";

export async function getTasks() {
  const res = await BaseApi.get("/rest/v1/tasks?select=*");
  //console.log("Task records : ", res.data);
  return res.data;
}

export async function createTask(newData) {
  const response = await BaseApi.post(`/rest/v1/tasks`, newData);
  //console.log("Task records : ", response.data);

  const created = response.data?.[0] ?? response.data;
 console.log("created activity log in task", created)

  await createActivityLog({
    user_id: newData.creator_id,
    workspace_id: newData.workspace_id,
    action: "created",
    entity_type: "Task",
    entity_id: created?.id ?? newData.id,
    details: {
      title: newData.title,
    },
  });

  console.log(response.data);
  return response.data;
}

export async function updateTask({ id, newData }) {
  const previousTaskRes = await BaseApi.get(
    `/rest/v1/tasks?id=eq.${id}&select=*&limit=1`
  );
  const previousData = previousTaskRes.data?.[0] ?? {};
  const response = await BaseApi.patch(`/rest/v1/tasks?id=eq.${id}`, newData);

  const changesField = Object.keys(newData).reduce((acc, key) => {
    if (previousData[key] !== newData[key]) {
      acc[key] = {
        from: previousData[key] ?? null,
        to: newData[key] ?? null,
      };
    }
    return acc;
  }, {});

  try {
    await createActivityLog({
      user_id: newData.creator_id ?? previousData.creator_id,
      workspace_id: newData.workspace_id ?? previousData.workspace_id,
      action: "updated",
      entity_type: "Task",
      entity_id: id,
      details: changesField,
    });
  } catch (error) {
    console.error("Failed to log task update activity:", error);
  }

  console.log("get previous activity log", previousData)
  console.log("get activity log", newData)

  console.log(response.data);
  return response.data;
}

export async function deleteTask(id) {

  const taskRes = await BaseApi.get(`/rest/v1/tasks?id=eq.${id}&select=*&limit=1`);
  const task = taskRes.data?.[0] ?? {};

  const response = await BaseApi.delete(`/rest/v1/tasks?id=eq.${id}`);

  await createActivityLog({
    user_id: task.creator_id,
    workspace_id: task.workspace_id,
    action: "deleted",
    entity_type: "Task",
    entity_id: id,
    details: { title: task.title },
  });


  return response.data;
}

export async function updateTaskStatus({
  taskId,
  updatedTaskId,
  existingData,
  movedBy
}) {
  const payload = {
    ...existingData,
    status: updatedTaskId,
  };

  const changesField = {
    status:{
      from:existingData.status ?? null,
      to:updatedTaskId ?? null
    }
  }
  const res = await BaseApi.patch(`/rest/v1/tasks?id=eq.${taskId}`, payload);

  try {
    await createActivityLog({
      user_id: movedBy ?? existingData.creator_id,
      workspace_id: existingData.workspace_id ?? null,
      action: "updated",
      entity_type: "Task",
      entity_id: taskId,
      details: changesField,
    });
  } catch (error) {
    console.error("Failed to log task status activity:", error);
  }


  //console.log("Task updated : ",res.data)
  return res.data;
}
