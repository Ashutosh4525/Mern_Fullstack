import express from "express";
import { registerUser,login,logoutUser, refreshAccessToken, changeCurrentPassword, sendOtp, verifyEmail, UpdateUser,getAllUser,getUser, softDeleteUser ,restoreUser} from "../controller/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js";

const userRouter=express.Router()

const userUpload=upload.single("avatar");

userRouter.post("/sign-up",userUpload, registerUser)
userRouter.post("/login", login)
userRouter.post("/logout",Authverify,logoutUser)
userRouter.post("/refresh-token",refreshAccessToken)
userRouter.post("/change-password",Authverify,changeCurrentPassword)
userRouter.post("/send-otp",sendOtp)
userRouter.post("/verify-email",verifyEmail)
userRouter.put("/me",Authverify, userUpload, UpdateUser)
userRouter.get("/all",Authverify,verifyAdmin, getAllUser); 
userRouter.get("/get/:id", Authverify, getUser);
userRouter.patch("/restore/:id", Authverify, restoreUser);
userRouter.patch("/me", Authverify, softDeleteUser);
userRouter.patch("/:id", Authverify,verifyAdmin, softDeleteUser);

export default userRouter;