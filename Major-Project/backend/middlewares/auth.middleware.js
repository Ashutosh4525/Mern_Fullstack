import { asyncHandler } from "./err.middleware.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const Authverify = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Get token from cookies
    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }

    // 2. Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // 3. If no token
    if (!token) {
        const error = new Error("Unauthorized request");
        error.code = 401;
        return next(error);
    }

    let decodedToken;

    // 4. Verify token
    try {
        decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET_KEY
        );
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            error.message = "Access token expired";
        } else {
            error.message = "Invalid access token";
        }
        error.code = 401;
        return next(error);
    }

    // 5. Find user
    const user = await User.findOne({
        _id: decodedToken?._id,
        isDeleted: false,
    }).select("-password -refreshToken");

    if (!user) {
        const error = new Error("User not found or deactivated");
        error.code = 401;
        return next(error);
    }

    // 6. Attach user to request
    req.user = user;
    next();
});


export const verifyAdmin = (req, res, next) => {
   
    if (!req.user) {
        const error = new Error("Unauthorized");
        error.code = 401;
        return next(error);
    }

    const roles = Array.isArray(req.user.role)
        ? req.user.role
        : [req.user.role];

    // console.log("User roles:", roles); // 🔥 debug
    // console.log("User role:", req.user.role); // 🔥 debug

    if (roles.includes("admin")) {
        return next();
    }
    else{
        const error = new Error("Access denied. Admin permissions required.");
        error.code = 403; 
        return next(error);
    }
};