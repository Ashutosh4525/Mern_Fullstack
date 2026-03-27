import { asyncHandler } from "./err.middleware.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const Authverify = asyncHandler(async (req,res,next) => {
    try {
        const token=req.cookies?.accessToken||req.header
        ("Authorization")?.replace("Bearer ","")
    
        if(!token){
            const error = new Error ("UnAuthorized request")
            error.code=401;
            return next(error)
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)
        console.log(decodedToken)
    
        const user=await User.findOne({_id:decodedToken?._id,isDeleted:false}).select("-password -refreshToken") 
        console.log("User from DB:", user);
    
        if (!user) {
            const error = new Error ("Invalid Access Token or Account Deactivated")
            error.code=400;
            return next(error)
        }
    
        req.user=user;
        next()
    } catch (error) {
        const err=new Error (error.message||"Invalid Access Token")
        err.code=400;
        return next(err)
    }
})

export const verifyAdmin = (req, res, next) => {
   
    if (!req.user) {
        const error = new Error("Unauthorized");
        error.code = 401;
        return next(error);
    }

    const roles = Array.isArray(req.user.role)
        ? req.user.role
        : [req.user.role];

    console.log("User roles:", roles); // 🔥 debug
    console.log("User role:", req.user.role); // 🔥 debug

    if (roles.includes("admin")) {
        return next();
    }
    else{
        const error = new Error("Access denied. Admin permissions required.");
        error.code = 403; 
        return next(error);
    }
};