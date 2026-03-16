import { getTasks, updateTaskStatus } from "@/api/tasks.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasks = () =>{
    return useQuery({
        queryKey:["tasks"],
        queryFn:getTasks,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,

    })
}

export const useDragCardMutation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTaskStatus,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey:["tasks"]})
        }
    })
}

