import { toast } from "sonner";
import { BaseApi } from "./instance/api";
import { SHA256 } from "crypto-js";

export async function loginUser({ username, password }) {
  try {
    const res = await BaseApi.get("/api/collections/profiles/records");
    //console.log("Raw data", res)
    const allUsers = res.data.data;
    //console.log(" data", allUsers)
    const user = allUsers.find(u => u.data?.username === username);
    //console.log("looking for this username:", username);
    //console.log("db pass", password);
    

    if (!user) {
      toast.error("User not found");
      throw new Error("User not found");
    }

    const hashedpass = SHA256(password).toString();

    // console.log("db pass", password);
    //  console.log("hashed pass", hashedpass);

    if (hashedpass !== user.data.password) {
      toast.error("Incorrect password");
      throw new Error("Incorrect password");
    }

    const token = `mock-jwt-${user.id}-${Date.now()}`;

    return {
      user: {
        id: user.id,
        username: user.data.username,
        role: user.data.role,
        first_name: user.data.first_name,
        last_name: user.data.last_name,
        email: user.data.email,
      },
      token: token,
    };
  } catch (err) {
    toast.error(`Error in Login API - ${err?.message}`);
    throw err
  }
}
