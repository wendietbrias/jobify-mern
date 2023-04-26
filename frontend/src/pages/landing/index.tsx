import "./style.scss";
import bg from "../../assets/bg.svg";
import { Link,Navigate } from "react-router-dom";
import {
   LogoImage
} from "../../components";
import { useAppSelector } from "../../hooks/toolkit";

const LandingPage = () => {
   const { token } = useAppSelector(state=>state.auth);

   if(token) {
      return <Navigate to="/"/>
   }

   return (
     <section className="container-landing">
        <div className="landing-content">
         <nav className="landing-content__navbar">
            <LogoImage/>
         </nav>
         <div className="landing-content__banner">
            <div className="banner__text">
                <h2>Job <span>Tracking</span> App</h2>
                <p>
                I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.
                </p>
               <Link to="/auth/login">
               <button className="banner__button">Login / Register</button>
               </Link>
            </div>
            <img src={bg} alt="bg" className="banner__img"/>
         </div>
        </div>
     </section>
   )
}

export default LandingPage;