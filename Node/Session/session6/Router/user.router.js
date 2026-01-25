import express from "express";
import { createUser, login, sendOtpOnly } from "../Controller/user.controller";
import { sendOtpEmail } from "../utils/app";

const userRouter=express.Router();

userRouter.post("/",createUser);
userRouter.post("/login", login)
userRouter.post("/send-otp",sendOtpOnly)

export default userRouter;