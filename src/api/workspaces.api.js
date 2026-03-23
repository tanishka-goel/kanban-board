import { BaseApi } from "./instance/api";
import { createActivityLog } from "./activity.api";

export async function getWorkspaces(){
    const res = await BaseApi.get("/rest/v1/workspaces?select=*");
    console.log("Supabase response",res.data)
    return res.data
}

export async function createWorkspace(newData){
    const response = await BaseApi.post(`/rest/v1/workspaces`,newData);

    await createActivityLog({
        user_id: newData.creatorID,
        workspace_id: createWorkspace.id,
        action: "created",
        entity_type: "Workspace",
        entity_id: newData.id,
        details:  {
        workspace_name: newData.workspace_name
    }
      });

    console.log("Created new record : ",response.data)
    return response.data 
}

export async function updateWorkspace({id,newData}){
    const response = await BaseApi.patch(`/rest/v1/workspaces?id=eq.${id}&select=*`, newData);

     await createActivityLog({
        user_id: newData.creatorID,
        workspace_id: id,
        action: "updated",
        entity_type: "Workspace",
        entity_id: id,
        details:  newData
      });
    console.log(response.data)
    return response.data
}