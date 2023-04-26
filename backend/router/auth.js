import express from 'express';
import {
    loginHandler,
    registerHandler 
} from "../controller/auth.js";

const router = express.Router();

//routing
router.post("/login",loginHandler);
router.post("/register",registerHandler);

export default router;