import "./style.scss";
import React,{ useState,ChangeEvent, useEffect } from 'react';
import { useAppSelector,useAppDispatch } from "../../hooks/toolkit";
import { deleteJobHandler } from "../../slices/JobSlice";
import { searchJobHandler } from "../../slices/JobSlice";
import {
    FaLocationArrow,
    FaBriefcase,
    FaCalendarAlt
} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { searchJobState } from "../../interfaces/AddJobInterface";
import ClipLoader from "react-spinners/ClipLoader";
import { getAllJobs } from "../../slices/JobSlice";
import moment from "moment";
import useDebounce from "../../hooks/useDebounce";
import { Pagination } from "../../components";

const AllJobs = ({
    page,
    setPage
} : { page:number,setPage:any }) => {
   const dispatch = useAppDispatch();
   const { jobs, loading , count }  = useAppSelector(state=>state.job);
   const { token } = useAppSelector(state=>state.auth);

   const [searchState,setSearchState] = useState<searchJobState>({
     search:"",
     type:"",
     status:"",
     sort:""
   });

   const searchHandler = (e : ChangeEvent<HTMLInputElement>) => {
       return setSearchState({
            ...searchState,
            search:(e.target as HTMLInputElement).value 
        });
   }

   const selectFilterHandler = (e : ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();

      dispatch(searchJobHandler({ searchTerm:searchState }));
     
   }

   const clearFilterHandler = () : void => {
      setSearchState({
        search:"",
        type:"",
        status:"",
        sort:""
      });
   }

   const debounceTerm = useDebounce(searchState.search , 400);

   useEffect(() => { 
    if(debounceTerm !== "") {
        dispatch(searchJobHandler({ searchTerm:searchState }));
    }
   } ,[debounceTerm, token ,page]);



    return (
        <div className="jobs-container">
            <div className="search-container">
                <h4>Search Form</h4>
                <div className="form">
                    <div className="form-control">
                        <label>Search</label>
                        <input onChange={searchHandler} name="search" value={searchState.search} type="text"/>
                    </div>
                    <div className="form-control">
                        <label>Status</label>
                        <select onChange={selectFilterHandler} name='status'>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="interview">Interview</option>
                            <option value="declined">Declined</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Type</label>
                        <select onChange={selectFilterHandler} name='type'>
                            <option value="all">All</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="remote">Remote</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Sort</label>
                        <select onChange={selectFilterHandler} name='sort'>
                            <option value="all">All</option>
                            <option value="latest">latest</option>
                            <option value="oldest">oldest</option>
                            <option value="a-z">a-z</option>
                            <option value="z-a">z-a</option>
                        </select>
                    </div>
                    <div className="form-button">
                    <button onClick={clearFilterHandler} type="button" id="clear">Clear Filters</button>
                    </div>
                </div>
            </div>
            {loading ? <div className='loading-job-container'>
                <ClipLoader
                  size={100}
                  loading={loading}
                  color={`#2cb1bc`}
                />
            </div> : (
                  <div className="job-items-container">
                  <h2>
                    {Array.isArray(jobs) && jobs.length > 0 ? `${jobs.length} Jobs Found` : "No jobs to display"}
                  </h2>
                  {jobs.length > 0 && (
                      <div className="jobs-item">
                      {Array.isArray(jobs) && jobs.map((job, idx) => (
                          <div className="job-item" key={idx}>
                              <div className="job-item__header">
                                  <span className="job-profile">
                                      {job.position?.charAt(0)}
                                  </span>
                                  <div className="job-title">
                                      <h4>{job.position}</h4>
                                      <h5>{job.company}</h5>
                                  </div>
                              </div>
                              <div className="job-item__detail">
                                  <div className="detail__item">
                                      <FaLocationArrow className="detail__item-icon"/>
                                      <p>{job.jobLocation}</p>
                                  </div>
                                  <div className="detail__item">
                                      <FaBriefcase className="detail__item-icon"/>
                                      <p>{job.jobType}</p>
                                  </div>
                                  <div className="detail__item">
                                      <FaCalendarAlt className="detail__item-icon"/>
                                      <p>{moment(job.createdAt).format("MMM Do YY")}</p>
                                  </div>
                                  <button className={`${job.status}`}>{job?.status}</button>
                              </div>
                              <div className="job-item__action">
                                  <Link to={`/add-job/${job._id}`}>
                                  <button className="job-item__action-edit">Edit</button>
                                  </Link>
                                  <button onClick={()=>dispatch(deleteJobHandler({ _id:job._id }))} className="job-item__action-delete">Delete</button>
  
                              </div>
                          </div>
                      ))}
                   </div>
                  )}
              </div>
            )}

            <Pagination page={page} setPage={setPage} count={count} />
        </div>
    )
}

export default AllJobs;