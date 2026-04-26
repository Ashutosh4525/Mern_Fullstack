import express from "express";
import { 
    createUser,
    signUp, 
    verifyEmail, 
    getUser, 
    login, 
    sendOtp, 
    forgotPassword,
    resetPass, 
    UpdateUser, 
    changePassword,
    restoreUser,
    softDeleteUser,
    getsingleUser
 } from "../controller/user.controller";
import { authware, isAdmin } from "../middlewares/auth.middleware";
// import uploads from "../middlewares/upload.middleware";
import { avatarUpload } from "../middlewares/upload.middleware";
const userRouter=express.Router();
import { handleValidationErrors } from "../middlewares/validation.middleware";
import { validateCreateUser } from "../middlewares/user.middleware";

const avatarUploads = avatarUpload.single("avatar");

userRouter.post("/signup1",avatarUploads,validateCreateUser,handleValidationErrors, createUser);
userRouter.post("/signup", signUp)
userRouter.post("/login",login)
userRouter.post("/sendotp",sendOtp)
userRouter.post("/verifyemail",authware,verifyEmail)
userRouter.post("/forgotpass",forgotPassword)
userRouter.post("/resetpass",resetPass)
userRouter.post("/restore", authware, isAdmin, restoreUser);
userRouter.put("/updateuser/:id",authware,avatarUploads,UpdateUser)
userRouter.patch("/change-password", authware, changePassword)
userRouter.get("/getuser",authware,isAdmin,getUser)
userRouter.get("/getsingleuser/:id",authware,getsingleUser)
userRouter.delete("/delete/:id", authware, isAdmin, softDeleteUser);


export default userRouter;
