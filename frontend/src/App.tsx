import React , { useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import {
  LandingPage,
  MainAuth,
  Register,
  MainHome,
  Login,
  StatsPage,
  AllJobs,
  AddJob,
  Profile,
  MainPassword,
  ForgotPassword,
  ResetPassword
} from "./pages";

function App() {
  const [page,setPage] = useState<number>(1);

  return (
    <Routes>
       <Route path="/" element={<MainHome page={page} />}>
         <Route index element={<StatsPage />}/>
         <Route path="all-jobs" element={<AllJobs page={page} setPage={setPage}/>}/>
         <Route path="add-job" element={<AddJob/>}/>
         <Route path="profile" element={<Profile/>}/>
         <Route path="add-job/:id" element={<AddJob/>}/>
       </Route>
       <Route path="/landing" element={<LandingPage/>}></Route>
       <Route path="/auth" element={<MainAuth/>}>
         <Route path="login" element={<Login/>} />
         <Route path="register" element={<Register/>}/>
       </Route>
       <Route path="/password" element={<MainPassword/>}>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="reset-password/:token" element={<ResetPassword/>}/>
       </Route>
    </Routes>
  );
}

export default App;
