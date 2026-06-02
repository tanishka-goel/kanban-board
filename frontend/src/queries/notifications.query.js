import { createNotifications, getNotifications, getReadNotifications, markNotificationAsRead } from "@/api/notifications.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGetNotifications = (userId) =>{
    return useQuery({
        queryKey:["notifications","unread", userId],
        queryFn:()=>getNotifications(userId),
        enabled: !!userId
    })
}

export const useGetReadNotifications = (userId) =>{
    return useQuery({
        queryKey:["notifications", "read", userId],
        queryFn:()=>getReadNotifications(userId),
        enabled: !!userId
    })
}


export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => markNotificationAsRead(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};