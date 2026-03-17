import { BaseApi } from "./instance/api";

export async function getTasks(){
    const res = await BaseApi.get("/collections/tasks/records");
    console.log("Task records : ",res.data)
    return res.data
}

export async function createTask(newData){
    const response = await BaseApi.post("/collections/tasks/records",{data:newData});
    console.log(response.data)
    return response.data 
}

export async function updateTask({id,newData}){
    const response = await BaseApi.put(`/collections/tasks/records/${id}`, {data:newData});
    console.log(response.data)
    return response.data
    
}

export async function updateTaskStatus({taskId,updatedTaskId, existingData}){
    const payload = {
        data:{
            ...existingData,
            status: updatedTaskId
        }
    };
    const res = await BaseApi.patch(`/collections/tasks/records/${taskId}`, payload);
    //console.log("Task updated : ",res.data.data)
    return res.data.data
}

