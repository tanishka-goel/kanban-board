import { BaseApi } from "./instance/api";

export async function getWorkspaces(){
    const res = await BaseApi.get("/rest/v1/workspaces?select=*");
    console.log("Supabase response",res.data)
    return res.data
}

export async function createWorkspace(newData){
    const response = await BaseApi.post(`/rest/v1/workspaces`,newData);
    console.log("Created new record : ",response.data)
    return response.data 
}

export async function updateWorkspace({id,newData}){
    const response = await BaseApi.patch(`/rest/v1/workspaces?id=eq.${id}`, newData);
    console.log(response.data)
    return response.data
}