import  mongoose,{ Schema,Model } from "mongoose";

const userSchema = new Schema({
     username:{
        type:String,
        required:[true , 'username is required'] 
     },
     email: {
        type:String,
        required:[true , "email is required"] ,
        unique:[true , 'email already in use'] 
     },
     password: {
        type:String,
        required:[true,"password is required"] ,
        min:[6,'min password characters is 6']
     },
     location: {
       type:String  
     },
     lastName: {
      type:String
     },
     confirmation: {
        type:Boolean,
        defaullt:false
     }
     
}, { timestamps:true });

export default mongoose.model('user' , userSchema);