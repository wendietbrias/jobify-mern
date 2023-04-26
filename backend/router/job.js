import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
    GetAllUserJob,
    CreateJob,
    UpdateJob,
    DeleteJob,
    SearchJob,
    GetAllUserStatsJob
} from "../controller/job.js";

const router = express.Router();

router.get("/all/user/stats" ,verifyToken , GetAllUserStatsJob);
router.get("/all/user" ,verifyToken, GetAllUserJob);  
router.delete("/delete/:id",verifyToken,DeleteJob);
router.put("/update/:id",verifyToken,UpdateJob);
router.post("/create" ,verifyToken, CreateJob);
router.post("/search",verifyToken, SearchJob);

export default router;