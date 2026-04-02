import { BaseApi } from "./instance/api";

export async function getNotifications(currUserId) {
  const response = await BaseApi.get(
    `/rest/v1/notifications?user_id=eq.${currUserId}&select=*,actor:actor_id(first_name,last_name)&order=created_at.desc`
  );
  return response.data;
}

export async function createNotifications (data){
    const response = await BaseApi.post(`/rest/v1/notifications`, data)
    return response.data
}