import { supabase } from "@/lib/supabase";
import axios from "axios";
import { toast } from "sonner";

export const BaseApi = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  timeout: 10000,
  headers: {
    Prefer: "return=representation",
    "Content-Type": "application/json",
    apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

BaseApi.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  },
);

BaseApi.interceptors.response.use(
  (response) => {
    if (response.status !== 200 && response.status !== 201) {
      console.error("Error in API");
    }
    return response;
  },
  async (error) => {
    console.error("API Error :", error.message);
    toast.error(`Network Error: Couldn't fetch details - ${error.message}`);
    return Promise.reject(error);
  },
);
