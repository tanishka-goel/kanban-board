import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUsers,
  deleteUsers,
  getUsers,
  updateUsers,
} from "@/api/users.api";
import { SHA256 } from "crypto-js";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userdata) => {
      const { data, error } = await supabase.auth.signUp({
        email: userdata.email,
        password: userdata.password,
        options: {
          data: {
            username: userdata.username,
            first_name: userdata.first_name,
            last_name: userdata.last_name,
            role: userdata.role || "user",
          },
        },
      });

      if (error) throw { response: { data: { error: error.message } } };
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError:(err) =>{
      toast.error("Failed to add new user")
    }
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete user");
    },
  });
};
