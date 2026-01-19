import express from "express"
import { CreateUser, GetUser, GetSingleUser, UpdateUser, DeleteUser } from "../controller/user.controller"

const userRouter=express.Router();

userRouter.post("/",CreateUser)
userRouter.get("/",GetUser)
userRouter.get("/:id",GetSingleUser);
userRouter.put("/:id",UpdateUser);
userRouter.delete("/:id", DeleteUser)


export default userRouter;