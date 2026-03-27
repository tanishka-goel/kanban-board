import { getMessages } from "@/api/messages.api";
import { useQuery } from "@tanstack/react-query";


export const useMessages = (sender_id, receiver_id) => {
  return useQuery({
    queryKey: ["messages", sender_id, receiver_id],
    queryFn: () => getMessages(sender_id, receiver_id),
    enabled: !!sender_id && !!receiver_id,
  });
};