import { Outlet,Navigate } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../hooks/toolkit";

const MainAuth = () => {
   const { token } = useAppSelector(state=>state.auth);

   if(token) {
    return <Navigate to="/"/>
   }

   return (
     <Outlet/>
   )
}

export default MainAuth;