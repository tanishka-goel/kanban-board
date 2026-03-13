import { BaseApi } from "./instance/api";

export async function getWorkspaces(){
    const res = await BaseApi.get("/collections/workspaces/records");
    console.log(res.data)
    return res.data
}