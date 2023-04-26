import userSchema from "../schemas/user.js";

 const GetUserProfile = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({ message:"Unauthorized" });
    }

  try {
    const findUser = await userSchema.findOne({ _id:user._id });

    if(!findUser) {
        return res.status(400).json({message:"Not found user profile data"});
    }

    return res.status(200).json({
           name:findUser.username,
           email:findUser.email,
           location:findUser.location || "" ,
           lastName:findUser.lastName || ""
        });

  } catch(err) {
    return res.status(500).json({message:err.message});
  }
}

const UpdateProfile = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({ message:"Unauthorized" });
    }

    try {
        const {
            name,
            lastName,
            email,
            location
        } = req.body;

        const findUser = await userSchema.findOne({ _id:user._id });

        if(findUser) {
            findUser.username = name;
            findUser.email = email ? email : findUser.email;
            findUser.location = location ? location : findUser.location;
            findUser.lastName = lastName;

            const saved = await findUser.save();

            return res.status(200).json({
                name:saved.username,
                email:saved.email,
                lastName:saved.lastName,
                location:saved.location
            });
        }

    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

export {
    GetUserProfile,
    UpdateProfile
}