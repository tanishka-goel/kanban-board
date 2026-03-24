
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUsers, deleteUsers, getUsers, updateUsers } from "@/api/users.api";
import { SHA256 } from "crypto-js";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userdata) =>{
          const hashedpass = SHA256(userdata.password).toString();

          return createUsers({...userdata, password:hashedpass})
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })
}

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); 
    },
  });
};

export const useDeleteUser = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:deleteUsers,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Deleted successfully")
    }
  })
}