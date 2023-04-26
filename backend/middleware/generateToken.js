import jwt from "jsonwebtoken";

const generateToken = (data,res) => {
      jwt.sign(data,process.env.JWT_SECRET ,{ algorithm:"HS256" } ,function(err,token) {
          if(token) {
               return res.status(200).json({ token });
          } else {
               return res.status(400).json({message:"no token generated"});
          }
     } , { expiresIn:"1d" }); 
}

export default generateToken;