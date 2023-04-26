import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import AlertSlice from "./slices/AlertSlice";
import ProfileSlice from "./slices/ProfileSlice";
import JobSlice from "./slices/JobSlice";
import PasswordSlice from "./slices/PasswordSlice";

const store = configureStore({
    reducer: {
        auth:AuthSlice,
        alert:AlertSlice,
        profile:ProfileSlice,
        job:JobSlice,
        password:PasswordSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;