import { BaseApi } from "./instance/api";
import { createActivityLog } from "./activity.api";

export async function getTasks() {
  const res = await BaseApi.get("/rest/v1/tasks?select=*");
  console.log("Task records : ", res.data);
  return res.data;
}

export async function createTask(newData) {
  const response = await BaseApi.post(`/rest/v1/tasks`, newData);

  await createActivityLog({
    user_id: newData.creator_id,
    workspace_id: newData.workspace_id,
    action: "created",
    entity_type: "task",
    entity_id: newData.id,
    details: {
      title: newData.title,
    },
  });

  console.log(response.data);
  return response.data;
}

export async function updateTask({ id, newData }) {
  const response = await BaseApi.patch(`/rest/v1/tasks?id=eq.${id}`, newData);

  await createActivityLog({
    user_id: newData.creator_id,
    workspace_id: newData.workspace_id,
    action: "updated",
    entity_type: "task",
    entity_id: id,
    details: newData
  });

  console.log(response.data);
  return response.data;
}

export async function deleteTask(id) {
  const response = await BaseApi.delete(`/rest/v1/tasks?id=eq.${id}`);
  return response.data;
}

export async function updateTaskStatus({
  taskId,
  updatedTaskId,
  existingData,
}) {
  const payload = {
    ...existingData,
    status: updatedTaskId,
  };
  const res = await BaseApi.patch(`/rest/v1/tasks?id=eq.${taskId}`, payload);
  //console.log("Task updated : ",res.data)
  return res.data;
}
