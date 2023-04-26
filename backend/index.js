import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./database/connection.js";

//routing import

import authRouter from "./router/auth.js";
import profileRouter from "./router/profile.js";
import jobRouter from "./router/job.js";
import passwordRouter from "./router/password.js";

dotenv.config({debug:true});

//mongoose

mongoose.set("bufferCommands" ,false);

//env variable

const port = process.env.PORT;

//deklarasi variabel app

const app = express({ limit:"2mb" });

//library atau package

app.use(express.json());
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
}));

app.use("/api/auth" ,authRouter);
app.use("/api/job" , jobRouter);
app.use("/api/profile",profileRouter);
app.use("/api/password" , passwordRouter);

//jalankan server 

connectDB(app,Number(port));

mongoose.connection.on("error" , function(error) {
    console.log(error);
});