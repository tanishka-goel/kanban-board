import axios from "axios";

const CHAT_API_URL = import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3000";

export async function getMessages( sender_id, receiver_id ) {
  const { data } = await axios.get(`${CHAT_API_URL}/api/messages`, {
    params: { sender_id, receiver_id },
  });
  return data;
}
