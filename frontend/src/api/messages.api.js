import { BaseApi } from "./instance/api";

export async function getMessages( sender_id, receiver_id ) {
  const { data } = await BaseApi.get(`/rest/v1/messages`, {
    params: { sender_id, receiver_id },
  });
  return data;
}
