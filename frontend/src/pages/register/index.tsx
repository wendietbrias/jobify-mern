import "./style.scss";
import { useState,ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { LogoImage,Alert } from "../../components";
import { 
    stateRegister
} from "../../interfaces/AuthInterface";
import {
    useAppDispatch
} from "../../hooks/toolkit";
import { registerHandler } from "../../slices/AuthSlice";

const Register = () => {
    const dispatch = useAppDispatch();
    const [formRegister,setFormRegister] = useState<stateRegister>({
        username:"",
        email:"",
        password:"",
        confirm:""
    });

    const changeHandler = (e : ChangeEvent<HTMLInputElement>) => {
        return setFormRegister({
          ...formRegister,
          [e.target.name]:(e.target as HTMLInputElement).value 
        });
    }
  
    const submitHandler = (e : any) => {
       (e).preventDefault();
       dispatch(registerHandler({ registerForm:formRegister,dispatch }));
    }

    return (
        <section className="register-container">
            <div className="register-content">
            <div className="register-content__header">
              <LogoImage/>
              <h2>Register</h2>
              </div>
              <Alert/>
              <form onSubmit={submitHandler} className="form-register">
              <div className="form-control">
                    <label>Username</label>
                    <input onChange={changeHandler} type="text" name="username" className="form-control__input"/>
                </div>
              
                <div className="form-control">
                    <label>Email</label>
                    <input onChange={changeHandler} type="email" name="email" className="form-control__input"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input onChange={changeHandler} type="password" name="password" className="form-control__input"/>
                </div>
                <div className="form-control">
                    <label>Confirm</label>
                    <input onChange={changeHandler} type="password" name="confirm" className="form-control__input"/>
                </div>
                <button  className="form-button" type="submit">Register</button>
              </form>
              <p className="redirect__el">
                Already have account? <Link to="/auth/login"><span>Login</span></Link>
              </p>
            </div>
        </section>
    )
}

export default Register;