import React from 'react';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaUser ,FaAlignLeft} from 'react-icons/fa';
import { useAppSelector,useAppDispatch } from '../hooks/toolkit';
import { TiArrowSortedDown } from 'react-icons/ti';
import { logoutHandler } from '../slices/AuthSlice';

const DropdownMenu = ({ dispatch } : { dispatch:any}) => {
  return (
    <div className="dropdown-wrapper-menu">
      <button onClick={()=> dispatch(logoutHandler())} className="logout-wrapper-button">Logout</button>
    </div>
  )
}

const Navbar = ({ setOpenSidebar } : { setOpenSidebar:any }) => {
  const dispatch = useAppDispatch();
  const { name,email } = useAppSelector(state=>state.profile);
  const [open,setOpen] = React.useState<boolean>(false);

  return (
    <nav className="navbar__container">
      <button onClick={()=>setOpenSidebar((openSidebar : boolean) => {
        if(openSidebar === false) {
           return true;
        } else {
          return false;
        }
      })} className="navbar__container-button-menu">
        <FaAlignLeft/>
      </button>
      <h3>Dashboard</h3>
      <button onClick={() => setOpen(!open)} className="navbar__container-button-user">
        <FaUser/>
        <p>{name ? name.split(" ")[0] : "test user"}</p>
        <TiArrowSortedDown/>
      </button>
      {open && <DropdownMenu dispatch={dispatch}  />}
    </nav>
  )
}

export default Navbar;