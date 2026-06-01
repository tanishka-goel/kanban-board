import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export async function loginUser({ username, password }) {

  try{

    const {data:profile, error:profileError} = await supabase
    .from("profiles")
    .select("email, username, first_name, last_name, role")
    .eq("username", username.trim().toLowerCase())
    .single()

    if(!profile || profileError){
      toast.error("No matching profile found")
      throw new Error("User not found")
    }

    const {data, error} = await supabase.auth.signInWithPassword({
      email:profile.email,
      password:password
    })

    if (error) {
      toast.error("Incorrect password");
      throw new Error(error.message);
    }

    return{
      token:data.session.access_token,
      user: {
        id: data.user.id,
        username: profile.username,
        role: profile.role,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: data.user.email,
      },
    }

  } catch(err){
    toast.error(`Login Error: ${err?.message}`);
    throw err;
  }

}
