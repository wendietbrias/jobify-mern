import { Outlet,redirect,Navigate } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../../hooks/toolkit';
import { useEffect , useState } from 'react'
import { Sidebar,Navbar } from '../../components';
import { getUserProfile } from '../../slices/ProfileSlice';
import { getAllJobs } from '../../slices/JobSlice';


const MainHome = ({ page } : { page:number }) => {
   const dispatch = useAppDispatch();
   const { token } = useAppSelector(state=>state.auth);

   const [openSidebar,setOpenSidebar] = useState(true);

   useEffect(() => {
      if(token) {
          dispatch(getUserProfile());
          dispatch(getAllJobs({ page }));
      }
   } ,[token]);

   if(!token) {
      return <Navigate to="/auth/login" />
   }

  return (
     <div className='home-container'>
       <Sidebar  openSidebar={openSidebar} />
       <div className={`home-container__content ${openSidebar ? "": "hidden"}`}>
       <Navbar setOpenSidebar={setOpenSidebar}/>
       <Outlet />
       </div>
     </div>
  )
}

export default MainHome