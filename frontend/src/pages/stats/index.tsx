import "./style.scss";
import { useState,useEffect } from "react";
import {
    FaSuitcaseRolling,
    FaCalendarCheck,
    FaBug
} from 'react-icons/fa';
import { useAppDispatch,useAppSelector } from "../../hooks/toolkit";
import { Chart } from "../../components";
import axios from "axios";

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URI}`
});

API.interceptors.request.use((req : any) => {
    if(JSON.parse(localStorage.getItem("user") || "null")) {
         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user") || "null") }`;
    }

    return req;
});

const statsData = [
    {
        status:"pending",
        count:0,
        icon:<FaSuitcaseRolling/>
    },
    {
        status:"interview",
        count:0,
        icon:<FaCalendarCheck/>
    },
    {
        status:"declined",
        count:0,
        icon:<FaBug/>
    }
];

const StatsPage = () => {
    const { jobs } = useAppSelector(state=>state.job);
    const [allJobs,setAllJobs] = useState([]);


    const fetchJobs = async () => {
        const response = await API.get(`/api/job/all/user/stats`);
        const filterPending = Array.isArray(response.data.data) ? response.data.data.filter((job : any)=>job.status === "pending" ? job : "") : [];
        const filterInterview = Array.isArray(response.data.data) ? response.data.data.filter((job : any)=>job.status==="interview" ? job : "") : [];
        const filterDeclined = Array.isArray(response.data.data) ? response.data.data.filter((job : any)=>job.status==="declined" ? job : "") : [];

        statsData[0].count = filterPending.length;
        statsData[1].count = filterInterview.length;
        statsData[2].count = filterDeclined.length;

        setAllJobs(response.data.data);
    }

    useEffect(() => {
        fetchJobs();
    },[]);

    return (
        <div className="stats-container">
            <div className="stats-grid">
                {statsData.map((data,idx) => (
                    <div className={`stats-grid__item ${data.status}`}>
                        <div className={`stats-grid-count ${data.status}`}>
                            <h2>{data.count}</h2>
                            <span className={`stats-grid-count__icon ${data.status}`}>{data.icon}</span>
                        </div>
                        <h4>{data.status}</h4>
                    </div>
                ))}
            </div>
            <Chart allJobs={allJobs}/>
        </div>
    )
}

export default StatsPage;