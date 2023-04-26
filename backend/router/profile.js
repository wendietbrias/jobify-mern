import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
    GetUserProfile, UpdateProfile
} from "../controller/profile.js";

const router = express.Router();

router.get("/user",verifyToken, GetUserProfile);
router.put("/update/:id" ,verifyToken, UpdateProfile);

export default router;