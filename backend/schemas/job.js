import mongoose,{ Schema,Model } from "mongoose";

const jobSchema = new Schema({
   user_id: {
    type:String,
    required:true ,
    ref:'users'
   },
   position: {
    type:String,
    required:true 
   },
   company:{
    type:String,
    required:true
   },
   jobLocation: {
      type:String,
      required:true 
   },
   status: {
     type:String,
     enum:["pending","interview","declined"],
     required:true 
   },
   jobType: {
    type:String,
    enum:["full-time","part-time","remote" , "internship"],
    required:true 
   }
}, { timestamps:true });

export default mongoose.model("job" , jobSchema);