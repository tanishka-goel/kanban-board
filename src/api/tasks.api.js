import { BaseApi } from "./instance/api";

export async function getTasks(){
    const res = await BaseApi.get("/rest/v1/tasks?select=*");
    console.log("Task records : ",res.data)
    return res.data
}

export async function createTask(newData){
    const response = await BaseApi.post(`/rest/v1/tasks`,newData);
    console.log(response.data)
    return response.data 
}

export async function updateTask({id,newData}){
    const response = await BaseApi.patch(`/rest/v1/tasks?id=eq.${id}`, newData);
    console.log(response.data)
    return response.data
}

export async function deleteTask(id) {
    const response = await BaseApi.delete(`/rest/v1/tasks?id=eq.${id}`);
    return response.data;
}

export async function updateTaskStatus({taskId,updatedTaskId, existingData}){
    const payload = {
      
            ...existingData,
            status: updatedTaskId
    };
    const res = await BaseApi.patch(`/rest/v1/tasks?id=eq.${taskId}`, payload);
    //console.log("Task updated : ",res.data.data)
    return res.data.data
}

