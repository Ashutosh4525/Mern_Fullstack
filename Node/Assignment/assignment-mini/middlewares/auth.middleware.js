import jwt from "jsonwebtoken"
import { asyncHandler } from "./error.middleware"

export const authware=asyncHandler(async (req,res,next) => {
    const headers=req.headers.authorization;
    console.log(headers);
    
    if (!headers) {
        return res.status(401).json({
                message:"Unauthorized",
                success:false
            })
    }

    const token=headers.split(" ").pop();
    // console.log(token);
    

    jwt.verify(token,process.env.TOKEN_SECRET_KEY, (error,decoded)=>{
        if(error){
                return res.status(403).json({
                    message:"Token expired",
                    success: false
                });
            }

            console.log("DECODED");
            console.log(decoded);
            const {id, role} = decoded;
            req.user={id,role};

            next();
    })
})

export const isAdmin=asyncHandler(async (req,res,next) => {
    console.log(req.user);
    const {id, role}=req.user;

        const hasAdminRole = Array.isArray(role) 
        ? role.includes("admin") 
        : role === "admin";

    if (!hasAdminRole) {
        return res.status(403).json({
            message:"Only admin can create & delete brands",
            success:false
        })
    }
    next()
})