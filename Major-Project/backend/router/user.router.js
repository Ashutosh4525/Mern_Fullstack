import express from "express";
import { registerUser,login,logoutUser, refreshAccessToken, changeCurrentPassword, sendOtp, verifyEmail, UpdateUser } from "../controller/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify } from "../middlewares/auth.middleware.js";

const userRouter=express.Router()

const userUpload=upload.single("avatar");

userRouter.post("/sign-up",userUpload, registerUser)
userRouter.post("/login", login)
userRouter.post("/logout",Authverify,logoutUser)
userRouter.post("/refresh-token",refreshAccessToken)
userRouter.post("/change-password",Authverify,changeCurrentPassword)
userRouter.post("/send-otp",sendOtp)
userRouter.post("/verify-email",Authverify,verifyEmail)
userRouter.put("/update-user",UpdateUser)


export default userRouter;