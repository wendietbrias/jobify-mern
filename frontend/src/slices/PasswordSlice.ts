import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}`
});

export const forgotPassHandler = createAsyncThunk('password/forgot' , async (email : string) => {
    try {
        const response = await API.post("/api/password/send-mail", { email });
    } catch(err) {
        return null;
    }
});

const PasswordSlice = createSlice({
    name:'password',
    initialState:{
        password:"",
        loading:false  
    },
    extraReducers:(builder) => {
  
        builder.addCase(forgotPassHandler.pending, (state) => {
            state.loading = true;

            return state;
        });
          
    },
    reducers:{}
});



export default PasswordSlice.reducer;