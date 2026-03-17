import { BaseApi } from "./instance/api";

export async function getWorkspaces(){
    const res = await BaseApi.get("/collections/workspaces/records");
    console.log(res.data)
    return res.data
}

export async function createWorkspace(newData){
    const response = await BaseApi.post("/collections/workspaces/records",{data:newData});
    console.log(response.data)
    return response.data 
}

export async function updateWorkspace({id,newData}){
    const response = await BaseApi.put(`/collections/workspaces/records/${id}`, {data:newData});
    console.log(response.data)
    return response.data
    
}