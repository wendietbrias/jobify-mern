import "./style.scss";
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [resetForm,setResetForm] = useState<{
    password:string,
    confirm:string
  }>({
    password:"",
    confirm:""
  });

  const { token } = useParams();

  useEffect(() => {
  
  } ,[token]);

  return (
    <div className="reset-pass-container">
        <div className="reset-form-container">
            <h2>New Password</h2>
            <div className="reset-form">
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" name="password"/>
                </div>
                <div className="form-control">
                    <label>Confirm</label>
                    <input type="password" name="confirm"/>
                </div>
                <button type="submit">Submit</button>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword;