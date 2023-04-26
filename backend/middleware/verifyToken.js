import jwt from 'jsonwebtoken';
import userSchema from '../schemas/user.js';

const verifyToken = async (req,res,next) => {
    const token = req.headers.authorization;


    if(token) {
        const actualToken = token.split(" ")[1];
                
        return jwt.verify(actualToken,process.env.JWT_SECRET, async function(err,decoded) {
            
            if(err){
                return res.status(500).json(err);
            }

            if(decoded) {
                const verifyUserAccount = await userSchema.findOne({ _id:decoded?._id });

                if(!verifyUserAccount) {
                    return res.status(401).json({message:"Invalid token"});
                }

                req.user = decoded;
                return next();
            }

            return res.status(401).json({message:"Unauthorized"});
        });
    }

    return res.status(401).json({message:"unauthorized"});
}

export default verifyToken;