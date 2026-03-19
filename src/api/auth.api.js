import { toast } from "sonner";
import { BaseApi } from "./instance/api";
import { SHA256 } from "crypto-js";

export async function loginUser({ username, password }) {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const res = await BaseApi.get(
      `/rest/v1/profiles?username=eq.${cleanUsername}&select=*`
    );
    // console.log("Response:", res.data);
    // console.log("looking for this username:", username);
    //console.log("Raw data", res)
    // const allUsers = res;
    // console.log(" data", allUsers)
    const user = res.data[0];
    console.log("User :", user)
    // console.log("db pass", password);
    

    if (!user) {
      toast.error("User not found");
      throw new Error("User not found");
    }

    const hashedpass = SHA256(password).toString();

    // console.log("db pass", password);
    //  console.log("hashed pass", hashedpass);

    if (hashedpass !== user.password) {
      toast.error("Incorrect password");
      throw new Error("Incorrect password");
    }

    const token = `mock-jwt-${user.id}-${Date.now()}`;

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token: token,
    };
  } catch (err) {
    toast.error(`Error in Login API - ${err?.message}`);
    throw err
  }
}
