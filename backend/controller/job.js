import jobSchema from "../schemas/job.js";

const GetAllUserStatsJob = async (req,res) => {
   const user = req.user;
   
   if(!user) {
      return res.status(401).json({message:"Unauthorized"});
   }


   try {

      const allUserJobs = await jobSchema.find({ user_id:user._id });

      return res.status(200).json({
          data:allUserJobs,
          page:1,
          perPage:10
      });

   } catch(err) {
      return res.status(500).json({
         message:err.message,
         status:'error'
      });
   }
}

const GetAllUserJob = async (req,res) => {
    const user = req.user;

    const {
      page,
      perPage,
    } = req.query;

    if(!user) {
      return res.status(401).json({message:"Unauthorized"});
   }

    try {
       const allUserJob = await jobSchema.find({ user_id:user._id })
       .limit(10)
       .skip(page < 2 ? 0 : Math.ceil(page * perPage))
       .exec();
       if(Array.isArray(allUserJob)) {
          return res.status(200).json({
            page:page,
            perPage:perPage,
            count:allUserJob.length, 
            data:allUserJob,
            status:'success'
          });
       }
    } catch(err) {
       return res.status(500).json({
         message:err.message,
         status:'error'
      });
    }
}

const CreateJob = async (req,res) => {
   const user = req.user;

   if(!user) {
      return res.status(401).json({message:"Unauthorized"});
   }
   
   try {
      const {
         jobLocation,
         company,
         jobType,
         status,
         position
      } = req.body;

      const initJob = new jobSchema({
          jobLocation,
          company,
          status,
          position,
          jobType,
          user_id:user._id
      });

      const saved = await initJob.save();

      if(saved) {
         return res.status(200).json(saved);
      }

      return res.status(400).json({message:"Error while creating job"});

   } catch(err) {
      return res.status(500).json({ message:err.message });
   }
}

const DeleteJob = async (req,res) => {
   const user = req.user;


   if(!user) {
      return res.status(401).json({message:"Unauthorized"});
   }

    try {
      const { id } = req.params;

      if(id) {
         const deleteJob = await jobSchema.deleteOne({_id:id});

         if(deleteJob) {
            return res.status(200).json({message:"success delete job"});
         }
      }

    } catch(err) {
      return res.status(500).json({ message:err.message });
    }
}

const UpdateJob = async (req,res) => {
   const user = req.user;

   if(!user) {
      return res.status(401).json({message:"Unauthorized"});
   }

   try {
      const { id } = req.params;
      const {
         location,
         company,
         jobType,
         status,
         position
      } = req.body;

      const findJob = await jobSchema.findOne({ _id:id });


      if(findJob) {
         findJob.jobLocation = location ? location : findJob.jobLocation;
         findJob.company = company ? company : findJob.company;
         findJob.status = status ? status : findJob.status;
         findJob.position = position ? position : findJob.position;
         findJob.jobType = jobType ? jobType : findJob.jobType;

         const saved = await findJob.save();

         if(saved) {
            return res.status(200).json(saved);
         }

         return res.status(400).json({message:"error while updating job"});
      }
      return res.status(400).json({message:"error while updating job"});


   } catch(err) {
      return res.status(500).json({message:err.message});
   }
}

const SearchJob = async (req,res) => {
   const user = req.user;
    const {
      status,
      type,
      sort,
      search,
      page,
      perPage
    } = req.body;

    try {
   
      const query = await jobSchema 
      .where({ position:{ $regex:/search/ , $options:"i" } })
      .exec();

      console.log(query);

      if(query.length == 0) {
         return res.status(200).json({
            data:await jobSchema.find({ user_id:user._id }),
            page,
            perPage:10
         });
      } else {
         return res.status(200).json({
            data:query,
            page,
            perPage:10
         });
      }
    } catch(err) {
      return res.status(500).json({message:err.message});
    }
}

export {
    GetAllUserJob,
    CreateJob,
    DeleteJob,
    UpdateJob,
    SearchJob,
    GetAllUserStatsJob
}