import express from "express";
import { createUser, login } from "../Controller/user.controller";
import { sendOtpEmail } from "../utils/app";

const userRouter=express.Router();

userRouter.post("/",createUser);
userRouter.post("/login", login)
userRouter.post("/send-otp",sendOtpEmail)

export default userRouter;