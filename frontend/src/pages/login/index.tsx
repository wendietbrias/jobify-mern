import { ChangeEvent, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../hooks/toolkit";
import { Link } from "react-router-dom";
import "./style.scss";
import { LogoImage,Alert } from "../../components";
import { loginHandler } from "../../slices/AuthSlice";
import { 
  stateLogin
} from "../../interfaces/AuthInterface";
import { useAppSelector } from "../../hooks/toolkit";

const Login = () => {
  const { auth,alert } = useAppSelector(state=>state);

  const dispatch = useAppDispatch();
  const [formLogin,setFormLogin] = useState<stateLogin>({
    email:"",
    password:""
  });

  const changeHandler = (e : ChangeEvent<HTMLInputElement>) => {
      return setFormLogin({
        ...formLogin,
        [e.target.name]:(e.target as HTMLInputElement).value 
      });
  }

  const submitHandler = (e : any) => {
     (e).preventDefault();

     dispatch(loginHandler({ loginForm:formLogin,dispatch }));
  }

    return (
        <section className="login-container">
            <div className="login-content">
              <div className="login-content__header">
              <LogoImage/>
              <h2>Login</h2>
              </div>
              <Alert/>
              <form onSubmit={submitHandler} className="form-login">
                <div className="form-control">
                    <label>Email</label>
                    <input onChange={changeHandler} type="email" name="email" className="form-control__input"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input onChange={changeHandler}  type="password" name="password" className="form-control__input"/>
                </div>
                <div className="forgot-pass">
                <p className="redirect__el">
                Forget Password? <Link to="/password/forgot-password"><span>Reset Password</span></Link>
              </p>
                </div>
                <button className="form-button" type="submit">Login</button>
              </form>
              <p className="redirect__el">
                Don't have account? <Link to="/auth/register"><span>Register</span></Link>
              </p>
            </div>
        </section>
    )
}

export default Login;