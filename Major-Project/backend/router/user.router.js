import express from "express";
import { registerUser,login,logoutUser, refreshAccessToken, changeCurrentPassword, sendOtp, verifyEmail, UpdateUser,getAllUser,getUser, softDeleteUser ,restoreUser} from "../controller/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { userValidator } from "../validators/user.validator.js";

const userRouter=express.Router()

const userUpload=upload.single("avatar");

userRouter.post("/sign-up",userValidator.create,validate,userUpload, registerUser)
userRouter.post("/login", userValidator.login,validate,login)
userRouter.post("/logout",Authverify,logoutUser)
userRouter.post("/refresh-token",refreshAccessToken)
userRouter.post("/change-password",Authverify,changeCurrentPassword)
userRouter.post("/send-otp",userValidator.sendotp,validate,sendOtp)
userRouter.post("/verify-email",userValidator.verifyotp,validate,verifyEmail)
userRouter.put("/me",Authverify, userValidator.updateProfile,validate,userUpload, UpdateUser)
userRouter.get("/",Authverify,verifyAdmin, getAllUser); 
userRouter.get("/:id", Authverify, getUser);
userRouter.patch("/restore/:id", Authverify, restoreUser);
userRouter.patch("/delete/me", Authverify, softDeleteUser);
userRouter.patch("/delete/:id", userValidator.idParam,validate,Authverify,verifyAdmin, softDeleteUser);

export default userRouter;