import { getActivityLogs } from "@/api/activity.api";
import {useQuery} from "@tanstack/react-query";
import { toast } from "sonner";

export const useActivityLogs = () =>{
    return useQuery({
        queryKey:["activity"],
        queryFn:getActivityLogs,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,

    })
}