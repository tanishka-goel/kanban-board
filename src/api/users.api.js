import { BaseApi } from "./instance/api";

export async function getUsers(){
    const response = await BaseApi.get("/rest/v1/profiles?select=*");
    console.log("Get User response",response.data)
    return response.data
    
}

export async function createUsers(newData){
    const response = await BaseApi.post(`/rest/v1/profiles`,newData);
    console.log("Create user response",response.data)
    return response.data 
}

export async function updateUsers({id,newData}){
    const response = await BaseApi.put(`/rest/v1/profiles?id=eq.${id}`, newData);
    console.log("Update User response",response.data)
    return response.data
    
}
