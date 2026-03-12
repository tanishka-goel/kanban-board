import { getUsers } from "@/api/users.api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userThunk = createAsyncThunk(
    "users/fetchUsers",
    async ({rejectWithValue}) =>{
        try{
            const res = await getUsers();
            return res
        } catch (error){
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data:[],
    error:null,
    isLoading:false
}

const userSlice = createSlice({
    name:"users",
    initialState
})