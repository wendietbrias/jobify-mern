import bcrypt from 'bcrypt';
import generateToken from '../middleware/generateToken.js';
import userSchema from "../schemas/user.js";

const loginHandler = async (req,res) => {
    try {
        //desctructuring body object
        const {
            email,
            password,
        } = req.body;

        //pertama cek apakah user ada atau tidak
        const findUser = await userSchema.findOne({ email });

        if(!findUser) {
            return res.status(404).json({message:"accout is not exists"});
        }

        //jika akun ada
        bcrypt.compare(password, findUser.password,function(err,result) {
            
            if(err) {
               return res.status(500).json(err);
            }

                if(result) {
                     generateToken({
                        name:findUser.username,
                        email:findUser.email,
                        _id:findUser._id
                    } , res);
                } else {
                    return res.status(400).json({message:"error authenticating user"});
                }         
        });

    } catch(err) {
       return res.status(500).json({message:err.message});
    }
}

const registerHandler = async (req,res) => {
    try {
           //desctructuring body object
           const {
            email,
            password,
            username,
            confirm
        } = req.body;


        //pertama cek apakah user ada atau tidak
        const findUser = await userSchema.findOne({ email:req.body.email });

        if(findUser) {
            return res.status(404).json({message:"accout is already exists"});
        }

        //cek apakah password sama dengan confirm

        if(password !== confirm) {
            return res.status(400).json({message:"password is not match"});
        }

        //buat akun
        bcrypt.genSalt(10,function(err,salt) {
            if(err) {
                return res.status(500).json(err);

            }

            bcrypt.hash(password,salt, async function(err,hash) {
                const initUser = new userSchema({
                    username,
                    email,
                });

                  if(hash) {
                     initUser.password = hash;
                     const saved = await initUser.save();

                     if(saved) {
                         return res.status(200).json({message:"success create account"});
                     }
                  } else {
                    return res.status(400).json({message:"failed while create account"});
                  }
            });
        })

    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

const isConfirmEmail = async (req,res) => {
    try {

    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

export {
    loginHandler,
    registerHandler,
    isConfirmEmail
}