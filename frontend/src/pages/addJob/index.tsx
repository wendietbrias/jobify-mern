import "./style.scss";
import { useState,ChangeEvent, useEffect } from 'react'
import { JobState } from "../../interfaces/AddJobInterface";
import { useAppDispatch,useAppSelector } from "../../hooks/toolkit";
import { Alert } from "../../components";
import { addJobHandler, updateJobHandler } from "../../slices/JobSlice";
import { useParams } from "react-router-dom";

const AddJob = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(state=>state.alert);
  const { jobs } = useAppSelector(state=>state.job);

  const [jobState,setJobState] = useState<JobState>({
    position:"" ,
    jobLocation:"" ,
    jobType:"" ,
    company:"" ,
    status:"",
  });

  const changeHandler = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();

    return setJobState({
        ...jobState,
        [e.target.name]:(e.target as HTMLInputElement | HTMLSelectElement).value
    });
  }

  const submitHandler = (e : any) => {
     e.preventDefault();

     if(params.id) {
        return dispatch(updateJobHandler({ jobState,dispatch,_id:params.id }));
     }
     dispatch(addJobHandler({ jobs:jobState ,dispatch }));
  }

  const cancelHandler = () => {
    setJobState({
        position:"" ,
        jobLocation:"" ,
        jobType:"" ,
        company:"" ,
        status:"",
    });
  }

  useEffect(() => {
    if(params.id){
        const findJob = jobs.find((job) => job._id == params.id);

        if(findJob) {
            setJobState({
                position:findJob.position ,
                jobLocation:findJob.jobLocation ,
                jobType:findJob.jobType ,
                company:findJob.company ,
                status:findJob.status,
            });
        }

    } else {
        setJobState({
            position:"" ,
            jobLocation:"" ,
            jobType:"" ,
            company:"" ,
            status:"",
        });
    }
  } ,[params]);

  return (
    <div className="add-job-container">
        <div className="add-job-form">
            {open && <Alert/>}
            <h4 style={{
                marginTop:`${open ? "25px" : "0px"}`
            }}>Add Job</h4>
            <form onSubmit={submitHandler} className="form">
                    <div className="form-control">
                        <label>Position</label>
                        <input onChange={changeHandler} value={jobState.position} type="text" name="position"/>
                    </div>
                    <div className="form-control">
                        <label>Company</label>
                        <input onChange={changeHandler} value={jobState.company} type="text" name="company"/>
                    </div>
                    <div className="form-control">
                        <label>Job Location</label>
                        <input onChange={changeHandler} value={jobState.jobLocation} type="text" name="jobLocation"/>
                    </div>
                    <div className="form-control">
                        <label>Status</label>
                        <select onChange={changeHandler} value={jobState.status} name="status">
                            <option value="pending">Pending</option>
                            <option value="interview">Interview</option>
                            <option value="declined">Declined</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Job Type</label>
                        <select onChange={changeHandler} value={jobState.jobType} name="jobType">
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="remote">Remote</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    <div className="form-button">
                     <button  type="submit" id="submit">{params.id ? "Update" : "Submit"}</button>
                     <button onClick={cancelHandler} type="button" id="cancel">Cancel</button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default AddJob