import { useState } from "react";
import { useAppSelector,useAppDispatch } from "../hooks/toolkit";
import { closeHandler } from "../slices/AlertSlice";

const Alert = ()  => {
    const dispatch = useAppDispatch();
    const { alert } = useAppSelector(state=>state);

    if(alert.open) {
        return (
            <div className={`alert-container ${alert.variant}`}>
                <h5>{alert.message}</h5>
                {alert.variant === "info" ? null : <button onClick={() => dispatch(closeHandler())}>x</button>}
            </div>
        )
    }
  
    return null; 
}

export default Alert;