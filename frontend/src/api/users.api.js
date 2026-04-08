import { BaseApi } from "./instance/api";

export async function getUsers(){
    const response = await BaseApi.get("/rest/v1/profiles?select=*");
    //console.log("Get User response",response.data)
    return response.data
    
}

export async function createUsers(newData){
   try{
     const response = await BaseApi.post(`/rest/v1/profiles`,newData);
    console.log("Create user response",response.data)
    return response.data 
   } catch (error){
    const supabaseError = error?.response?.data

    if (supabaseError?.code === "23505") {
        const details = supabaseError?.details || ""
        if (details.toLowerCase().includes("username")) {
        throw { response: { data: { error: "Username already exists." } } };
      }
    }
    throw error
   }
}

export async function updateUsers({id,newData}){
    const response = await BaseApi.put(`/rest/v1/profiles?id=eq.${id}`, newData);
    console.log("Update User response",response.data)
    return response.data
    
}

export async function deleteUsers(id){
    const response = await BaseApi.delete(`/rest/v1/profiles?id=eq.${id}`);
    console.log("Delete User response",response.data)
    return response.data
}