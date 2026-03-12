import { BaseApi } from "./instance/api";

export async function getUsers(){
    const response = await BaseApi.get("/api/collections/profiles/records");
    console.log(response.data)
    return response.data.data
    
}

export async function createUsers(newData){
    const response = await BaseApi.post("/api/collections/profiles/records",newData);
    console.log(response.data)
    return response.data 
}

export async function updateUsers({id,newData}){
    const response = await BaseApi.put(`/api/collections/profiles/records/${id}`, newData);
    console.log(response.data)
    return response.data
    
}
