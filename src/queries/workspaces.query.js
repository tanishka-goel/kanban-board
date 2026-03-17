import { createWorkspace, getWorkspaces, updateWorkspace } from "@/api/workspaces.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useWorkspaces = () =>{
    return useQuery({
        queryKey:["workspaces"],
        queryFn:getWorkspaces,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}

export const useCreateWorkspace = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userdata)=>{
            return createWorkspace(userdata)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        }
    })
}

export const useEditWorkspace = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWorkspace,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        }
    })
}

