
import React from 'react'
import LogoImage from './Logo'
import { Link,useLocation } from 'react-router-dom'
import {IoIosStats} from "react-icons/io";
import { RiUserSearchLine } from "react-icons/ri";
import { BiNotepad } from 'react-icons/bi';
import { AiOutlineProfile } from 'react-icons/ai';

const Sidebar = ({ openSidebar } : { openSidebar:boolean }) => {
  const { pathname } = useLocation();

  return (
    <aside className={`sidebar ${openSidebar ? "open" : "hidden"}`}>
        <LogoImage/>
        <div className="sidebar__links">
            <Link className={`sidebar__link-item ${pathname === "/" ? "active" : ""}`} to="/">
                <IoIosStats className='icon'/>
                <p>Stats</p>
            </Link>
            <Link className={`sidebar__link-item ${pathname === "/all-jobs" ? "active" : ""}`} to="/all-jobs">
                <RiUserSearchLine className='icon'/>
                <p>All Jobs</p>
            </Link>
            <Link className={`sidebar__link-item ${pathname === "/add-job" ? "active" : ""}`} to="/add-job">
                <BiNotepad className='icon'/>
                <p>Add Job</p>
            </Link>
            <Link className={`sidebar__link-item ${pathname === "/profile" ? "active" : ""}`} to="/profile">
                <AiOutlineProfile className='icon'/>
                <p>Profile</p>
            </Link>
        </div>
    </aside>
  )
}

export default Sidebar