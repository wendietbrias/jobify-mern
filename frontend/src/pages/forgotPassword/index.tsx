import "./style.scss";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/toolkit";
import { forgotPassHandler } from "../../slices/PasswordSlice";
import { Alert } from "../../components";
import { useAppSelector } from "../../hooks/toolkit";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const [email,setEmail] = useState<string>("");

  const submitHandler = (e : any) => {
    e.preventDefault();
    
    dispatch(forgotPassHandler(email));
  }

  return (
    <div className="forgot-container">
      <div className="forgot-form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={submitHandler} className="form-forgot">
          <div className="form-control">
            <label>Email</label>
            <input type="email" name="email" onChange={(e : any) => setEmail(e.target.value)} value={email} />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>Back to <Link to="/auth/login">Login</Link> </p>
      </div>
    </div>
  )
}

export default ForgotPassword