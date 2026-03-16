import { BaseApi } from "./instance/api";

export async function getTasks(){
    const res = await BaseApi.get("/collections/tasks/records");
    console.log("Task records : ",res.data)
    return res.data
}

export async function updateTaskStatus({taskId,updatedTaskId, existingData}){
    const payload = {
        data: {
            ...existingData,
            status: updatedTaskId
        }
    };
    const res = await BaseApi.patch(`/collections/tasks/records/${taskId}`, payload);
    console.log("Task updated : ",res.data)
    return res.data
}

