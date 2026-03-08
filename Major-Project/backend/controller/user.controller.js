import User from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jwt"
import crypto from "crypto"
import { asyncHandler } from "../middlewares/err.middleware";
import { uploadOnCloudinary } from "../config/cloudinary.config";


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
    
    const avatarLocalPath=req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        const error = new Error ("Avatar file is required")
        error.code=409;
        return next(error)
    }
    
    const avatar=await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        const error = new Error ("Avatar file is required")
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

const login=asyncHandler(async (req,res) => {
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
        message:"User logged In Successfully"
    })
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
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

const getAllUser = asyncHandler(async (res,req) => {
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

const getUser = asyncHandler(async (res,req) => {
    const {id}=req.params
    const user = await User.findById(id).select("-password");

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


const changeCurrentPassword = asyncHandler(async(req, res) => {
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

// const UpdateUser = asyncHandler(async (req,res) => {
//     const {id} =req.params;

//     const user = await User.findOne({_id:id, isDeleted:false});

//     if(!user){
//         const error = new Error("User not found");
//         error.code = 404;
//         return next(error);
//     }

//     const updates={}
// })

const refreshAccessToken = asyncHandler(async (req, res) => {
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