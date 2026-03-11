import { BaseApi } from "./instance/api";

export async function getUsers(){
    const response = await BaseApi.get("/collections/profiles/records");
    console.log(response.data)
    return response.data
    
}