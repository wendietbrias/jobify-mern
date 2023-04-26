import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { openHandler,closeHandler } from "../slices/AlertSlice";
import { JobSliceState, JobState } from "../interfaces/AddJobInterface";
import axios from "axios";
import { stat } from "fs";

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}`
});

const user = JSON.parse(localStorage.getItem("user") || "null");

API.interceptors.request.use((req : any) => {
    if(user && user != "null") {
        req.headers.Authorization = `Bearer ${user}`;
    }

    return req;
});

//async thunk

export const getAllJobs = createAsyncThunk('job/get-all-job' , async ({ page } : { page:number }) => {
      try {
        const { data } = await API.get(`/api/job/all/user?page=${page}&perPage=${10}`);
        if(data) {
            return data;
        }

      } catch(err) {
         return null;
      }
});

export const addJobHandler = createAsyncThunk('job/add-job' , async ({
    jobs,dispatch
} : { jobs:JobState,dispatch:any } ) => {
  
    dispatch(openHandler({
        open:true,
        message:"Creating job...",
        variant:"info"
    }));

     try {
        const { data } = await API.post("/api/job/create", jobs);
  
        if(data) {
            dispatch(openHandler({
                open:true,
                message:"Success creating job",
                variant:"success"
            }));
            
            setTimeout(() => {
                window.location.href = "/all-jobs";
            }, 2000)
            return data;
        }

     } catch(err : any) {
        const { response:{ data } } = err;

        dispatch(openHandler({
            open:true,
            message:data.message,
            variant:"error"
        }));
         return null;
     }
});

export const deleteJobHandler = createAsyncThunk('job/delete-job' , async (
    { _id } : { _id:string }
) => {
    try {
        const { data } = await API.delete(`/api/job/delete/${_id}`);

        return _id;

    } catch(err : any) {
      return null;
    }
});

export const updateJobHandler = createAsyncThunk('job/update-job' , async (
    { jobState, _id,dispatch } : { jobState:JobState,_id:string,dispatch:any }
) => {

    dispatch(openHandler({
        open:true,
        message:"Updating job...",
        variant:"info"
    }));

     try {
        const { data } = await API.put("/api/job/update/" + _id , jobState);

        if(data) {
            dispatch(openHandler({
                open:true,
                message:"Success creating job",
                variant:"success"
            }));
            
            setTimeout(() => {
                window.location.href = "/all-jobs";
            }, 2000);
            
            return data;
        }

     } catch(err : any) {
        const { response:{ data } } = err;

        dispatch(openHandler({
            open:true,
            message:data.message,
            variant:"error"
        }));
         return null;
     }
});

export const searchJobHandler = createAsyncThunk('job/search' , async ({ searchTerm } : { searchTerm:any }) => {
    try {
      const { data } = await API.post("/api/job/search"  ,searchTerm);
      return data

    } catch(err) {
        return null;
    }
});

//initial state

const initialState : JobSliceState = {
    loading:false,
    jobs:[],
    page:1,
    perPage:10,
    count:0
}

//slices

const JobSlice = createSlice({
   name:'job',
   reducers:{},
   initialState,
   extraReducers:(builder)=>{
      builder.addCase(getAllJobs.pending, (state : JobSliceState) => {
          state.loading = true;

          return state;
      });

      builder.addCase(getAllJobs.fulfilled  , (state : JobSliceState , { payload }:{ payload:any }) => {
          state.jobs = payload.data;
          state.loading = false;
          state.page = payload.page;
          state.count = payload.count;
          state.perPage = payload.perPage;

          return state;
      });

      builder.addCase(addJobHandler.fulfilled, (state : JobSliceState , { payload }) => {
           state.jobs = [...state.jobs,payload];

           return state;
      });

      builder.addCase(deleteJobHandler.fulfilled , (state, { payload }) => {
          const filteredJobs = state.jobs.filter(job=>job._id !== payload ? job : "");
          state.jobs = filteredJobs;

          return state;
      });

      builder.addCase(updateJobHandler.fulfilled , (state, { payload }) => {
           const mappedJob = state.jobs.map((job) => job._id === payload._id ? payload : job);
           state.jobs = mappedJob;

           return state;
      }); 

      builder.addCase(searchJobHandler.pending, (state : JobSliceState) => {
           state.loading = true;

           return state;
      });

      builder.addCase(searchJobHandler.fulfilled, (state,{ payload }:{ payload:any }) => {
          state.loading = false;
          state.jobs = payload.data;
          state.page = payload.page;
          state.perPage = payload.perPage;
          
          return state;
      });
   }
});

export default JobSlice.reducer;