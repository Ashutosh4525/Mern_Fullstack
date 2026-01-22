import express from "express";
import { createUser, login, sendOtpOnly } from "../Controller/user.controller";

const userRouter=express.Router();

userRouter.post("/",createUser);
userRouter.post("/login", login)
userRouter.post("/send-otp",sendOtpOnly)

export default userRouter;