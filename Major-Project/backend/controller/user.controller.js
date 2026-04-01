import User from "../models/user.model.js";
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js"
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import {v2 as cloudinary} from "cloudinary";



const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId).select("+refreshToken")
        console.log("USER:", user);
        if (!user) {
            const error = new Error("User not found for token generation");
            error.code = 500;
            throw error;
        }

        const accessToken = user.generateAccessToken()
        console.log("ACCESS TOKEN GENERATED");
        const refreshToken = user.generateRefreshToken()
        console.log("REFRESH TOKEN GENERATED");

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
        // const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


    } catch (err) {
        // console.log(err);
        // const error = new Error("Something went wrong while generating refresh and access token",err);
        // error.code = 500;
        // throw error;
        console.error("TOKEN ERROR:", err);
        const error = new Error(err.message || "Token generation failed");
        error.code = 500;
        throw error;
    }
}


export const registerUser = asyncHandler(async(req,res,next)=>{

    let {firstname,lastname,email,password} = req.body
    console.log(email, password);

    if (
        [firstname, email, lastname, password].some((field) => field?.trim() === "")
    ) {
        const error = new Error ("All fields are required")
        error.code=400;
        return next(error)
    }

    const finduser=await User.findOne({email})

    if(finduser){
        const error = new Error ("This email already exist")
        error.code=409;
        return next(error)
    }
    
    const avatarLocalPath=req.file?.path;
    console.log(avatarLocalPath);
    
    // if (!avatarLocalPath) {
    //     const error = new Error ("Avatar file is required")
    //     error.code=409;
    //     return next(error)
    // }

    // const avatar=await uploadOnCloudinary(avatarLocalPath,"avatars")

    // if (!avatar) {
    //     const error = new Error ("Avatar file not found")
    //     error.code=400;
    //     return next(error)
    // }


    let avatar = null;

    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath, "avatars");
        avatar = {
            url: avatar.url,
            public_id: avatar.public_id
        };
    }
    
    const user=await User.create({
        firstname,
        avatar:avatar|| undefined,
        lastname,
        email,
        password
    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

     if (!createdUser) {
        const error = new Error ("Something went wrong while registering the user")
        error.code=500;
        return next(error)
    }

    return res.status(201).json({
        data:createdUser,
        message:"All Good",
        success:true
    })

})

export const login=asyncHandler(async (req,res,next) => {
    const {email,password}=req.body;

    if (!email || !password) {
        const error = new Error ("Email and password are required")
        error.code=400;
        return next(error)
    }

     const user = await User.findOne({email, isDeleted:false}).select("+password");

     if (!user) {
        const error = new Error ("User does not exist or account is deactivated")
        error.code=404;
        return next(error)
     }

    //  if (!user.isEmailVerified) {
    //     const error = new Error("Please verify your email first");
    //     error.code = 403;
    //     return next(error);
    // }

     const isPasswordValid= await user.isPasswordCorrect(password)

     if (!isPasswordValid) {
        const error = new Error ("Invalid Password")
        error.code=400;
        return next(error)
     }

     const {accessToken, refreshToken}=await generateAccessAndRefreshTokens(user._id)

    //  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

     const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        // data:[accessToken,refreshToken],
        message:"User logged In Successfully"
    })
})

export const logoutUser = asyncHandler(async(req, res,next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            // new: true
             returnDocument: 'after' 
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message:"User logged Out"})
})

export const getAllUser = asyncHandler(async (req,res,next) => {
    if (req.user.role !== "admin") {
        const error = new Error("Unauthorized");
        error.code = 404;
        return next(error);  
    }
    const user = await User.find({isDeleted: false})
    .select("-password -refreshToken -otp -otpExpires");

    // if (!user) {
    //     const error = new Error("User not found");
    //     error.code = 404;
    //     return next(error);  
    // }
    
    return res.status(200)
    .json({
        success:true,
        data:user,
        message:"Fetched user detail"
    })
})

export const getUser = asyncHandler(async (req,res,next) => {
    const {id}=req.params
    const user = await User.findById(id)
        // .populate("rental")
        .populate("watchHistory")
        .select("-password -refreshToken");

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);  
    }

    return res.status(200)
    .json({
        success:true,
        data:user,
        message:"Fectched user detail"
    })
});


export const changeCurrentPassword = asyncHandler(async(req, res,next) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id).select("+password")
    if (!user) {
        const error = new Error("User not found or disabled");
        error.code = 404;
        return next(error);
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        const error = new Error("Invalid old password");
        error.code = 400;
        return next(error);  
    }

    user.password = newPassword
    await user.save()

    return res
    .status(200)
    .json({ 
        success:true,
        message:"Password changed successfully"
    })
})

export const UpdateUser = asyncHandler(async (req,res,next) => {
    // const {id} =req.params;

    const user = await User.findOne({_id:req.user._id, isDeleted:false});

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }
    if(req.body.email && req.body.email !== user.email){
    const emailExists = await User.findOne({email:req.body.email,_id: { $ne: user._id }})
        if(emailExists){
            const error = new Error("Email already in use");
            error.code = 409;
            return next(error);
        }
    }

    // if(!user){
    //     const error = new Error("User not found");
    //     error.code = 404;
    //     return next(error);
    // }

    let avatarUrl = user.avatar; 
    const avatarLocalPath=req.file?.path;
    if(avatarLocalPath){
        const avatar= await uploadOnCloudinary(avatarLocalPath,"avatars")
        if(!avatar.url){
        const error = new Error ("Error while uploading avatar")
        error.code=400;
        return next(error)
    }
        if (user.avatar?.public_id) {
            // const oldPublicId = user.avatar.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        avatarUrl = {
            url: avatar.url,
            public_id: avatar.public_id
        };
    }

    
    const updateduser= await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                firstname:req.body.firstname || user.firstname,
                email:req.body.email || user.email,
                lastname:req.body.lastname || user.lastname,
                avatar:avatarUrl
            },
        },
        { returnDocument: 'after', runValidators: true }
    ).select("-password -refreshToken")

    return res.status(201).json({
        success: true,
        message:"User updated successfully",
        data:updateduser,
    })
})


export const sendOtp=asyncHandler(async (req,res,next) => {
    console.log("sendOtp called with body:", req.body);
    // const {email} = req.body;
    let { email } = req.body;
    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found with this email");
        error.code = 404;
        return next(error);
    }
    // const Otp_Salt = Number(process.env.OTP_SALT) || 10;
    // console.log("OTP_SALT used:", Otp_Salt);
    // const otp=generateOtp();
    // console.log(otp)
    // const hashedOtp=bcrypt.hashSync(otp.toString(), Otp_Salt);
    // console.log(hashedOtp);

    // user.otp=hashedOtp;
    // user.otpExpires = Date.now()+ 5 * 60 * 1000;

    
    if (user.otpExpires && user.otpExpires > Date.now() ) {
        const error = new Error("Please wait before requesting another OTP");
        error.code = 429;
        return next(error);
    }
    const otp = user.generateOTP(); 
    await user.save({ validateBeforeSave: false });

    try {
        await sendEmail({
            email: user.email,
            subject: "Your Verification Code",
            message: `Your OTP is ${otp}. It expires in 5 minutes.`,
            html: `
                <div style="font-family: sans-serif; text-align: center;">
                    <h2>Verify Your Account</h2>
                    <p>Use the code below to complete your verification:</p>
                    <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
                    <p>This code <b>expires in 5 minutes</b>.</p>
                </div>`
        });
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email!"
        });
    }catch (err) {
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        const error = new Error("Failed to send email. Please try again.");
        error.code = 500;
        return next(error);
    }
})


export const verifyEmail=asyncHandler(async (req,res,next) => {
    let {email, otp}=req.body;
    email = email.toLowerCase();
    if (!email || !otp) {
        const error = new Error("Email and OTP are required");
        error.code = 409;
        return next(error);
    }

    const user =await User.findOne({
        email,
        isDeleted:false
        // otpExpires: {$gt: Date.now()}
    }).select("+otp otpExpires")

    if (!user||!user.otp) {
        const error = new Error("User not found or otp not found");
        error.code = 400;
        return next(error);
    }

    if (user.otpExpires < Date.now()) {
        // Clear expired OTP data to keep DB clean
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        
        const error = new Error("OTP has expired. Please request a new one");
        error.code = 410;
        return next(error);
    }

    // const isOtpValid = bcrypt.compareSync(otp.toString(), user.otp);
    // if (!isOtpValid) {
    //     const error = new Error("Invalid OTP");
    //     error.code = 400;
    //     return next(error);
    // }
    // user.isEmailVerified = true;
    // await user.save();
    const isCorrect = await user.isOtpCorrect(otp);

    if (!isCorrect) {
        const error = new Error("Invalid OTP");
        error.code = 401;
        return next(error);
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: "Email verified successfully!"
    });
})


export const forgotPassword = asyncHandler(async (req,res,next) =>{
    let {email} = req.body;
    email = email.toLowerCase();
    const user = await User.findOne({email});

    if (!user) {
        const error = new Error("No user found with that email");
        error.code = 404;
        return next(error);
    }

    const otp = user.generateOTP(); 
    await user.save({ validateBeforeSave: false });

    try {
            await sendEmail({
                // email: user.email,
                // subject: "Password Reset Code",
                // message: `Your password reset code is ${resetOtp}.`,
                // html: `<h1>Reset Password</h1><p>Use this code: <b>${resetOtp}</b></p>`
                email: user.email,
                subject: "Your Verification Code",
                message: `Your OTP is ${otp}. It expires in 5 minutes.`,
                html: `
                    <div style="font-family: sans-serif; text-align: center;">
                        <h2>Verify Your Account</h2>
                        <p>Use the code below to complete your verification:</p>
                        <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
                        <p>This code <b>expires in 5 minutes</b>.</p>
                    </div>`
            });
            return res.status(200).json({ success: true, message: "Reset OTP sent to email" });
        } catch (err) {
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save({ validateBeforeSave: false });
            const error = new Error("Email failed to send");
            error.code = 409;
            return next(error);
        }
    })


export const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

     if (!email || !otp || !newPassword) {
        const error = new Error("Email, OTP, and new password are required");
        error.code = 400;
        return next(error);
    }

    const user = await User.findOne({ email, isDeleted: false }).select("+otp otpExpires");

    if (!user || !user.otp) {
        const error = new Error("Invalid request or OTP not found");
        error.code = 404;
        return next(error);
    }

    if (user.otpExpires < Date.now()) {
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        const error = new Error("OTP has expired");
        error.code = 410;
        return next(error);
    }
    const isOtpCorrect = await user.isOtpCorrect(otp);
    if (!isOtpCorrect) {
        const error = new Error("Invalid Otp");
        error.code = 401;
        return next(error);
    }

    user.password = newPassword;

    user.otp = undefined;
    user.otpExpires = undefined;
    user.refreshToken = undefined;
    await user.save(); 

    return res.status(200).json({
        success: true,
        message: "Password reset successfully! You can now log in with your new password."
    });
});

export const refreshAccessToken = asyncHandler(async (req, res,next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        const error = new Error("unauthorized request");
        error.code = 404;
        return next(error);
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        )
    
        const user = await User.findById(decodedToken?._id).select("+refreshToken")
    
        if (!user) {
            const error = new Error("Invalid refresh token");
            error.code = 404;
            return next(error);
        }

         if (incomingRefreshToken !== user?.refreshToken) {
            const error = new Error("Refresh token is expired or used");
            error.code = 401;
            return next(error);
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            data:{accessToken, refreshToken},
            message:"Access token refreshed"
        })
    } catch (err) {
            const error = new Error("Invalid refresh token");
            error.code = 404;
            return next(error);
    }
})


export const softDeleteUser = asyncHandler(async (req, res, next) => {
    // Note: We use req.user._id if the user is deleting their own account
    // or req.params.id if an admin is deleting it.
    if (req.params.id && req.user.role !== "admin") {
            const error = new Error("Unauthorized");
            error.code = 404;
            return next(error);
    }
    const userId = req.params.id || req.user?._id;

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                isDeleted: true,
                deletedAt: new Date()
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    // Optional: Clear cookies if the user deleted their own account
    const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            success: true,
            message: "Account deactivated. It will be permanently deleted in 30 days."
        });
});


export const restoreUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { isDeleted: false, deletedAt: null } },
        { new: true }
    ).select("-password -refreshToken");

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: user,
        message: "User account restored successfully"
    });
});
