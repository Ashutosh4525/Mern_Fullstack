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
    softDeleteUser
 } from "../controller/user.controller";
import { authware, isAdmin } from "../middlewares/auth.middleware";

const userRouter=express.Router();
const app=express();

const avatarUploads = uploads.single("avatar");

userRouter.post("/",avatarUploads, createUser);
userRouter.post("/signup", signUp)
userRouter.post("/login",login)
userRouter.post("/sendotp",sendOtp)
userRouter.post("/verifyemail",authware,verifyEmail)
userRouter.post("/forgotpass",forgotPassword)
userRouter.post("/resetpass",resetPass)
userRouter.post("/restore", restoreUser);
app.use(authware)
userRouter.put("/updateuser/:id",authware,avatarUploads,UpdateUser)
userRouter.patch("/change-password", changePassword)
userRouter.get("/getuser",authware,getUser)
userRouter.delete("/delete/:id", authware, softDeleteUser);


export default userRouter;