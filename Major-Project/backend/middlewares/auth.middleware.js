import { asyncHandler } from "./err.middleware.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const Authverify = asyncHandler(async (req,res,next) => {
    try {
        const token=req.cookies?.accessToken||req.header
        ("Authorization")?.replace("Bearer","")
    
        if(!token){
            const error = new Error ("UnAuthorized request")
            error.code=401;
            return next(error)
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)
    
        const user=await User.findById({_id:decodedToken?._id,isDeleted:false}).select("-password -refreshToken")
    
        if (!user) {
            const error = new Error ("Invalid Access Token or Account Deactivated")
            error.code=400;
            return next(error)
        }
    
        req.user=user;
        next()
    } catch (error) {
        new Error (error.message||"Invalid Access Token")
        error.code=400;
        return next(error)
    }
})

export const verifyAdmin = (req, res, next) => {
   
    if (req.user && (req.user.role === "admin" || req.user.isAdmin === true)) {
        next();
    } else {
        const error = new Error("Access denied. Admin permissions required.");
        error.code = 403; 
        return next(error);
    }
};