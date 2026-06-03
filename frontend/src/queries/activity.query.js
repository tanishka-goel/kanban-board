import { getActivityLogs } from "@/api/activity.api";
import {useQuery} from "@tanstack/react-query";

export const useActivityLogs = () =>{
    return useQuery({
        queryKey:["activity"],
        queryFn:getActivityLogs,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,

    })
}