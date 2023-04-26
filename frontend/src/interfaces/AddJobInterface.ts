export interface JobState {
    position:string 
    jobLocation:string 
    jobType:string 
    company:string 
    status:string,

}

export interface searchJobState {
    search:string 
    type:string 
    status:string 
    sort:string
}

export interface JobSliceState {
    loading:boolean 
    jobs:Array<any>,
    page:number,
    perPage:number,
    count:number
}