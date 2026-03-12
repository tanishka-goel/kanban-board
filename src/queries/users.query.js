
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createUsers, getUsers } from "@/api/users.api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useAddUser = () =>{
    return useMutation({
        queryFn:createUsers,
        onSuccess:() =>{
            QueryClient.invalidateQueries(["users"]);
        }
    })
}