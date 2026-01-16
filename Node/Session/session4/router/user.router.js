import express from "express"
import { CreateUser } from "../controller/user.controller"

const userRouter=express.Router();

userRouter.post("/",CreateUser)

export default userRouter;