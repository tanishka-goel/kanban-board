import { BaseApi } from "./instance/api";

export async function getUsers(){
    const response = await BaseApi.get("/collections/profiles/records");
    console.log(response.data)
    return response.data.data
    
}

export async function createUsers(newData){
    const response = await BaseApi.post("/collections/profiles/records",{data:newData});
    console.log(response.data)
    return response.data 
}

export async function updateUsers({id,newData}){
    const response = await BaseApi.put(`/collections/profiles/records/${id}`, {data:newData});
    console.log(response.data)
    return response.data
    
}
