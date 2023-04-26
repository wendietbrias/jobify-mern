import "./style.scss";
import { useAppSelector,useAppDispatch } from "../../hooks/toolkit";
import { useState,useEffect,ChangeEvent } from "react";
import { ProfileStateSlice } from "../../interfaces/ProfileInterface";
import { updateProfileUser } from "../../slices/ProfileSlice";
import { Alert } from "../../components";
import { openHandler } from "../../slices/AlertSlice";

const Profile = () => {
   const dispatch = useAppDispatch();
   const { open } = useAppSelector(state=>state.alert);
   const { user } = useAppSelector(state=>state.auth);
   const { name,email,lastName,location } = useAppSelector(state=>state.profile);

   const [profileState,setProfileState] = useState<ProfileStateSlice>({
     name:"",
     email:email ,
     lastName:lastName ,
     location:location  
   });

   useEffect(() => {
    setProfileState({
      name:name ,
      email:email ,
      lastName:lastName ,
      location:location  
    });


   },[name,email,location,lastName]);

   const changeHandler = (e : ChangeEvent<HTMLInputElement>) => { 
       e.preventDefault();

       return setProfileState({
        ...profileState,
        [e.target.name]:(e.target as HTMLInputElement).value 
       });
   }

   const submitHandler = (e : any) => {
     e.preventDefault();

     if(profileState.name === "" || profileState.email === "" || profileState.location === "" || profileState.lastName === "") {
       return dispatch(openHandler({
          open:true,
          variant:'error',
          message:'Please provides all values'
       }));
     }

     dispatch(updateProfileUser({ id:user?._id || "", profileState ,dispatch }));
   }

   return (
    <div className="profile-container"> 
     <div className="profile-form-container">
      {open && <Alert/>}
        <h4 style={{
          marginTop:open ? "25px" : "0px"
        }}>Profile</h4>
        <form onSubmit={submitHandler} className="form">
        <div className="form-control">
          <label>Username</label>
          <input onChange={changeHandler} value={profileState.name} type="text" name="name"/>
        </div>
        <div className="form-control">
          <label>Lastname</label>
          <input onChange={changeHandler} value={profileState.lastName} type="text" name="lastName"/>
        </div>
        <div className="form-control">
          <label>Email</label>
          <input onChange={changeHandler} value={profileState.email} type="text" name="email"/>
        </div>
          <div className="form-control">
          <label>Location</label>
          <input onChange={changeHandler} value={profileState.location} type="text" name="location"/>
        </div>
        <div className="form-button">
        <button id="save">Save Changes</button>
        </div>
        </form>
     </div>
    </div>
   )
}

export default Profile;