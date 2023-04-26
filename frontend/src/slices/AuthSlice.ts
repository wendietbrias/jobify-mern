import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
    stateLogin,
    stateRegister,
    AuthState
} from "../interfaces/AuthInterface";
import {
    openHandler,
    closeHandler
} from "./AlertSlice";

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}`
});


const user  = JSON.parse(localStorage.getItem("user") || "null");

const state : AuthState = {
    token:user && user !== "null" ? user : null,
    user:user && user !== "null" ? jwtDecode(user) : null
}

export const loginHandler = createAsyncThunk(
    'auth/login' , 
    async (
        { loginForm , dispatch } :
        { loginForm:stateLogin,dispatch:any }) => {

     dispatch(openHandler({
        message:"Redirecting...",
        open:true,
        variant:"info"
     }));
            
     try {
        const { data } = await API.post("/api/auth/login" , loginForm); 
        //cek jika response dari api ada
        if(data) {
            //kembalikan data ke extra reducers
            return data;
        }
     } catch(err : any) {
        const { response:{ data } } = err;
        dispatch(openHandler({
            message:data.message,
            open:true,
            variant:"error"
         }));
     }
});

export const registerHandler = createAsyncThunk(
    'auth/register',
    async (
        { registerForm ,dispatch } : 
        { registerForm:stateRegister | null,dispatch:any }) => {
    try {
        dispatch(openHandler({
            message:"Creating user...",
            open:true,
            variant:"info"
         }));

        const { data } = await API.post("/api/auth/register" , registerForm); 
        //cek jika response dari api ada
        if(data) {
            //redirect ke halaman login
            window.location.href = "/auth/login";
            return data;
        }
     } catch(err : any) {
        const { response:{ data } } = err;
        dispatch(openHandler({
            message:data.message,
            open:true,
            variant:"error"
         }));
     }
});

const AuthSlice = createSlice({
    name:'auth',
    initialState:state ,
    reducers: {
        logoutHandler(state : AuthState) {
            state.token = null;
            state.user = null;

            window.location.href = "/auth/login";

            localStorage.setItem("user" , JSON.stringify(state.token));

            return state;
        }
    },
    extraReducers:(builder) => {
       builder.addCase(loginHandler.fulfilled,(state : AuthState, { payload }:{ payload:{ token:string } }) => {
            state.token = payload.token;
            state.user = payload.token ? jwtDecode(payload.token) : null;

            localStorage.setItem("user" , JSON.stringify(state.token));

            window.location.href = "/";

            return state;
       }); 
    }
});

export const { logoutHandler } = AuthSlice.actions;

export default AuthSlice.reducer;