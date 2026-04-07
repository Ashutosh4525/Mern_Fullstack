import express from "express";
import { registerUser,login,logoutUser, refreshAccessToken, changeCurrentPassword, sendOtp, verifyEmail, UpdateUser,getAllUser,getAllUsersIncludingDeleted,getUser, softDeleteUser ,restoreUser, getCurrentUser,contactSubmit, forgotPassword, resetPassword, sendOtpForPasswordChange, verifyOtpChangePassword } from "../controller/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { userValidator } from "../validators/user.validator.js";

const userRouter=express.Router()

const userUpload=upload.single("avatar");

userRouter.post("/sign-up",userUpload,userValidator.create,validate, registerUser)
userRouter.post("/login", userValidator.login,validate,login)
userRouter.post("/logout",Authverify,logoutUser)
userRouter.post("/refresh-token",refreshAccessToken)
userRouter.post("/change-password",Authverify,changeCurrentPassword)
userRouter.post("/send-otp",userValidator.sendotp,validate,sendOtp)
userRouter.post("/send-otp-password-change",Authverify,sendOtpForPasswordChange)
userRouter.post("/verify-otp-change-password",Authverify,userValidator.verifyOtpChangePassword,validate,verifyOtpChangePassword)
userRouter.post("/forgot-password",userValidator.sendotp,validate,forgotPassword)
userRouter.post("/reset-password",userValidator.resetPassword,validate,resetPassword)
userRouter.post("/verify-email",userValidator.verifyotp,validate,verifyEmail)
userRouter.get("/me",Authverify,getCurrentUser)
userRouter.put("/me",Authverify,userUpload, userValidator.updateProfile,validate, UpdateUser)
userRouter.put("/:id", Authverify, verifyAdmin, userUpload, userValidator.idParam, userValidator.updateProfile, validate, UpdateUser);
userRouter.get("/all",Authverify,verifyAdmin, getAllUser); 
userRouter.get("/all-admin",Authverify,verifyAdmin, getAllUsersIncludingDeleted); 
userRouter.get("/:id", Authverify, getUser);
userRouter.patch("/restore/:id", userValidator.idParam,validate,Authverify,verifyAdmin, restoreUser);
userRouter.patch("/delete/me", Authverify, softDeleteUser);
userRouter.patch("/delete/:id", userValidator.idParam,validate,Authverify,verifyAdmin, softDeleteUser);
userRouter.post("/contact", contactSubmit);

export default userRouter;
