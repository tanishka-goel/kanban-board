import axios from "axios";
import { toast } from "sonner";

export const BaseApi = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:5000,
    headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_REQRES_PUBLIC_KEY,
  'X-Reqres-Env': 'dev' 
}
})

BaseApi.interceptors.request.use(
     (config)=>{
        console.log("Request sent : ",config.url )
        return config;
    },
    (error)=>{
        console.log("Request Error", error);
        return Promise.reject(error);
    }
)

BaseApi.interceptors.response.use(
     (response)=>{
        if(response.status !== 200 && response.status !==201 ){
            console.log("Error in API")
        }
        return response;
    },
    (error)=>{
        // console.log("API Error :", error.message);
        toast.error(`Network Error: Couldn't fetch details - ${error.message}`);
        return Promise.reject(error);
    }
)