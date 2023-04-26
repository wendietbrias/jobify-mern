import express from 'express';
import {
    ForgotPassword
} from "../controller/password.js";

const router = express.Router();

router.post("/send-mail",ForgotPassword);

export default router;