import { getWorkspaces } from "@/api/workspaces.api"
import { useQuery } from "@tanstack/react-query"

export const useWorkspaces = () =>{
    return useQuery({
        queryKey:["workspaces"],
        queryFn:getWorkspaces,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}