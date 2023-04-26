import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileStateSlice } from "../interfaces/ProfileInterface";
import axios , { InternalAxiosRequestConfig } from "axios";
import { openHandler } from "./AlertSlice";

const user  = JSON.parse(localStorage.getItem('user') || "null");
const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}`
});

API.interceptors.request.use((req : InternalAxiosRequestConfig<any>) => {
    if(user) {
        req.headers.Authorization = `Bearer ${user}`;
    }

    return req;
});

const initialState : ProfileStateSlice = {
    name:"",
    email:"",
    location:"",
    lastName:""
}

//async thunk

export const getUserProfile = createAsyncThunk('profile/get-user-profile' , async () => {
     try {
        const { data } = await API.get(`/api/profile/user`);
        
        if(data) {
            return data;
        }

     } catch(err) {
        return null;
     }
});

export const updateProfileUser = createAsyncThunk('profile/user-profile-update' , async (
    { id,profileState,dispatch } : { id:string, profileState:ProfileStateSlice,dispatch:any }
) => {
    dispatch(openHandler({
        open:true,
        message:"Updating...",
        variant:"info"
    }));

    try {
        const { data } = await API.put("/api/profile/update/"+id ,profileState);
   
        if(data) {
           dispatch(openHandler({
               open:true,
               message:"all update is saved",
               variant:"success"
           }));
           return data;
        }
    } catch(err) {
        dispatch(openHandler({
            open:true,
            message:"failed to update profile",
            variant:"error"
        }));
    }
     const { data } = await API.put("/api/profile/update/"+id ,profileState);

     if(data) {
        dispatch(openHandler({
            open:true,
            message:"all update is saved",
            variant:"success"
        }));
        return data;
     }
});

const ProfileSlice = createSlice({
    name:'profile',
    reducers:{},
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getUserProfile.fulfilled, (state , { payload }) => {
            state = payload;
            return state;
        });

        builder.addCase(updateProfileUser.fulfilled , (state , { payload }) => {
             state = payload;
             return state;
        });
    }
});

export default ProfileSlice.reducer;