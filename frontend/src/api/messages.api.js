import axios from "axios";

const ChatApi = axios.create({
  baseURL:import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3000",
  timeout:10000
})


export async function getMessages( sender_id, receiver_id ) {
  const { data } = await ChatApi.get("/api/messages", {
    params: { sender_id, receiver_id },
  });
  return data;
}
