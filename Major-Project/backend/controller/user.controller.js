import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import {v2 as cloudinary} from "cloudinary";



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new Error(500, "Something went wrong while generating referesh and access token")
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
        error.code=401;
        return next(error)
    }
    
    const avatarLocalPath=req.file?.path;
    console.log(avatarLocalPath);
    

    if (!avatarLocalPath) {
        const error = new Error ("Avatar file is required")
        error.code=409;
        return next(error)
    }
    
    const avatar=await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        const error = new Error ("Avatar file not found")
        error.code=400;
        return next(error)
    }

    const user=await User.create({
        firstname,
        avatar:avatar.url,
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

export const login=asyncHandler(async (req,res) => {
    const {email,password}=req.body;

    if (!email && !password) {
        const error = new Error ("username or email is required")
        error.code=400;
        return next(error)
    }

     const user = await User.findOne({email})

     if (!user) {
        const error = new Error ("User does not exist")
        error.code=400;
        return next(error)
     }

     const isPasswordValid= await user.isPasswordCorrect(password)

     if (!isPasswordValid) {
        const error = new Error ("Invalid Password")
        error.code=400;
        return next(error)
     }

     const {accessToken, refreshToken}=await generateAccessAndRefereshTokens(user._id)

     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

     const options = {
        httpOnly: true,
        secure: true
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

export const logoutUser = asyncHandler(async(req, res) => {
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
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message:"User logged Out"})
})

export const getAllUser = asyncHandler(async (req,res) => {
    const user = await User.find();

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
})

export const getUser = asyncHandler(async (req,res) => {
    const {id}=req.params
    const user = await User.findById(id)
        .populate("rental")
        .populate("watchHistory")
        .select("-password -refreshToken");

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);  
    }

    return res.status(200)
    .json(req.user,{
        success:true,
        data:user,
        message:"Fectched user detail"
    })
});


export const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        const error = new Error("Invalid old password");
        error.code = 400;
        return next(error);  
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json({ 
        success:true,
        message:"Password changed successfully"
    })
})

export const UpdateUser = asyncHandler(async (req,res) => {
    const {id} =req.params;

    const user = await User.findOne({_id:id, isDeleted:false});

    if(!user){
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    let avatarUrl = user.avatar; 
    const avatarLocalPath=req.file?.path;
    if(avatarLocalPath){
        const avatar= await uploadOnCloudinary(avatarLocalPath)
        if(!avatar.url){
        const error = new Error ("Error while uploading avatar")
        error.code=400;
        return next(error)
    }
        if (user.avatar) {
            const oldPublicId = user.avatar.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(oldPublicId);
        }

        avatarUrl = avatar.url;
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
    const {email} = req.body;

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
        // user.otp = undefined;
        // user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        const error = new Error("Failed to send email. Please try again.");
        error.code = 500;
        return next(error);
    }
})


export const verifyEmail=asyncHandler(async (req,res,next) => {
    const {email, otp}=req.body;

    if (!email || !otp) {
        return next(new Error("Email and OTP are required", 400));
    }

    const user =await User.findOne({
        email,
        isDeleted:false
        // otpExpires: {$gt: Date.now()}
    })

    if (!user||!user.otp) {
        const error = new Error("User not found"||"otp not found");
        error.code = 400;
        return next(error);
    }

    if (user.otpExpires < Date.now()) {
        // Clear expired OTP data to keep DB clean
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        return next(new Error("OTP has expired. Please request a new one", 410));
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
        return next(new Error("Invalid OTP", 401));
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
    const {email} = req.body;
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
            return next(new Error("Email failed to send"));
        }
    })


export const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

     if (!email || !otp || !newPassword) {
        return next(new Error("Email, OTP, and new password are required", 400));
    }

    const user = await User.findOne({ email, isDeleted: false });

    if (!user || !user.otp) {
        return next(new Error("Invalid request or OTP not found", 404));
    }

    if (user.otpExpires < Date.now()) {
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new Error("OTP has expired", 410));
    }
    const isOtpCorrect = await user.isOtpCorrect(otp);
    if (!isOtpCorrect) {
        return next(new Error("Invalid OTP", 401));
    }

    user.password = newPassword;

    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save(); 

    return res.status(200).json({
        success: true,
        message: "Password reset successfully! You can now log in with your new password."
    });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        const error = new Error("unauthorized request");
        error.code = 404;
        return next(error);
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            const error = new Error("Invalid refresh token");
            error.code = 404;
            return next(error);
        }

         if (incomingRefreshToken !== user?.refreshToken) {
            const error = new Error("Refresh token is expired or used");
            error.code = 404;
            return next(error);
        }

        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json({
            data:{accessToken, refreshToken: newRefreshToken},
            message:"Access token refreshed"
        })
    } catch (error) {
            error = new Error("Invalid refresh token");
            error.code = 404;
            return next(error);
    }
})