import { createSlice } from "@reduxjs/toolkit";
import { alertState } from "../interfaces/AlertInterface";

const initialState : alertState = {
    open:false,
    message:"",
    variant:""
};

const AlertSlice = createSlice({
    name:'alert',
    reducers: {
        openHandler(state:alertState , { payload } : { payload:alertState }) {
            state.open = payload.open;
            state.message = payload.message;
            state.variant = payload.variant;

            return state;
        },
        closeHandler(state:alertState){
            state.open = false;
            state.message ="";
            state.variant = "";
        }
    },
    initialState
});

export const {
    closeHandler,
    openHandler
} = AlertSlice.actions;

export default AlertSlice.reducer;