import { createNotifications, getNotifications, markNotificationAsRead } from "@/api/notifications.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGetNotifications = (userId) =>{
    return useQuery({
        queryKey:["notifications", userId],
        queryFn:()=>getNotifications(userId),
        enabled: !!userId
    })
}

export const useCreateNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification created successfully");
    },
    onError: (err) => {
      console.log("Error in notification creation : ", err);
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => markNotificationAsRead(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};