import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { asyncHandler } from "../middlewares/error.middleware";
import sendEmail from "../utils/sendEmail";
import { processImageUpload, replaceImage } from "../utils/imageUpload";
// import dotenv from "dotenv"
// dotenv.config()

export function generateOtp() {
    const min=100000;
    const max=999999;
    const otp=crypto.randomInt(min,max);
    return otp;
}

export const createUser= asyncHandler(async (req,res,next) => {
     const {firstname,lastname,email,password,role}=req.body;
        // console.log(firstname,lastname,email,password,role,avatar);
        const finduser=await User.findOne({email})

    if (finduser) {
        const error= new Error("this email already exist")
            error.code=401;
            // error.message=error;
            return next(error)
    }

    const P_SALT= Number(process.env.PASS_SALT);
    const hashedPassword=bcrypt.hashSync(password,P_SALT);
    // console.log(hashedPassword);

    
    // avatarUploads(req,res,)
    const avatar = await processImageUpload(req, 'avatar');
    const newuser=await User.create({firstname,lastname,role:role||["user"],email,password:hashedPassword,avatar})
    
    return res.status(200).json({
            data:newuser,
            message:"All Good",
            success:true
        })
})

export const login=asyncHandler(async(req,res,next)=>{
    let {email,password}=req.body;

    const existingUser=await User.findOne({email})

    if (existingUser && existingUser.isDeleted) {
            const error = new Error("This account is deactivated. Please restore it to log in.");
            error.code = 403;
            return next(error);
    }

    if (!existingUser) {
            const error= new Error("User not found")
            error.code=404;
            // error.message=error;
            return next(error)
    }

    const compare = bcrypt.compareSync(password,existingUser.password)

    if (!compare) {
        const error= new Error("Invalid credential")
            error.code=401;
            // error.message=error;
            return next(error)
    }

    const token=jwt.sign({id:existingUser._id, role:existingUser.role},process.env.TOKEN_SECRET_KEY,{expiresIn:"1d"})
    // console.log(token);
    
    return res.status(200).json({
            data:existingUser,
            token,
            message:"User Logged in",
            success:true
        })
})

export const signUp=asyncHandler(async (req,res,next) => {
    let {email,password}=req.body; 

    const existingUser=await User.findOne({email});
    if (existingUser) {
        const error = new Error("Email already in use");
        error.code = 400;
        return next(error);
    }

    const P_SALT= Number(process.env.PASS_SALT);
    const hashedPassword=bcrypt.hashSync(password,P_SALT);
    // console.log(hashedPassword);

    
    const newUser=await User.create({
        email,
        password:hashedPassword
    })

    const token =jwt.sign({id:newUser._id,role:newUser.role},process.env.TOKEN_SECRET_KEY,{
        expiresIn:"1d"
    })
    return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        data: newUser
    });
})

export const sendOtp=asyncHandler(async (req,res,next) => {
    // console.log("sendOtp called with body:", req.body);
    const {email} = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found with this email");
        error.code = 404;
        return next(error);
    }
    const Otp_Salt = Number(process.env.OTP_SALT) || 10;
    // console.log("OTP_SALT used:", Otp_Salt);
    const otp=generateOtp();
    // console.log(otp)
    const hashedOtp=bcrypt.hashSync(otp.toString(), Otp_Salt);
    // console.log(hashedOtp);

    user.otp=hashedOtp;
    user.otpExpires = Date.now()+ 5 * 60 * 1000;
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

    const user =await User.findOne({
        email,
        otpExpires: {$gt: Date.now()}
    })

    if (!user) {
        const error = new Error("Invalid or expired OTP");
        error.code = 400;
        return next(error);
    }

    const isOtpValid = bcrypt.compareSync(otp.toString(), user.otp);
    if (!isOtpValid) {
        const error = new Error("Invalid OTP");
        error.code = 400;
        return next(error);
    }
    user.isEmailVerified = true;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Email verified successfully!"
    });
})

//forget pass get otp
export const forgotPassword = asyncHandler(async (req,res,next) =>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        const error = new Error("No user found with that email");
        error.code = 404;
        return next(error);
    }

    const resetOtp = generateOtp();
    const Otp_Salt = Number(process.env.OTP_SALT);

    user.otp=bcrypt.hashSync(resetOtp.toString(), Otp_Salt);
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    try {
        await sendEmail({
            // email: user.email,
            // subject: "Password Reset Code",
            // message: `Your password reset code is ${resetOtp}.`,
            // html: `<h1>Reset Password</h1><p>Use this code: <b>${resetOtp}</b></p>`
            email: user.email,
            subject: "Your Verification Code",
            message: `Your OTP is ${resetOtp}. It expires in 5 minutes.`,
            html: `
                <div style="font-family: sans-serif; text-align: center;">
                    <h2>Verify Your Account</h2>
                    <p>Use the code below to complete your verification:</p>
                    <h1 style="color: #4A90E2; letter-spacing: 5px;">${resetOtp}</h1>
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

//reset forgotten pass
export const resetPass=asyncHandler(async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    // console.log(req.body);
    
    const user = await User.findOne({ 
        email, 
        otpExpires: { $gt: Date.now() } 
    });

    if (!user || !user.otp) {
        return next(new Error("OTP expired or invalid request", 400));
    }

     if (!otp) return next(new Error("OTP is required", 400));

    const isMatch = bcrypt.compareSync(otp.toString(), user.otp);
    if (!isMatch) return next(new Error("Invalid OTP code", 400));
    const P_SALT = Number(process.env.PASS_SALT) || 10;
    user.password = bcrypt.hashSync(newPassword, P_SALT);

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password reset successful! You can now log in."
    });
})


export const getUser=asyncHandler(async (req,res,next) =>{

    const user = await User.find(); //{isDeleted:false}
    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        path:"http://localhost:8000/image/",
        data: user
    });
})

export const getsingleUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); 

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: user
    });
});

//update user info
export const UpdateUser=asyncHandler(async (req,res,next) => {
    const {id}=req.params;

    const user=await User.findOne({_id:id,isDeleted:false});

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    // const {firstname,lastname,email}=req.body;

    const updates={...req.body};
    // updates.avatar= await replaceImage(req, user.avatar, 'avatar');
    if (req.file) {
        updates.avatar = await replaceImage(req, user.avatar, 'avatar');
    }

    const newUser=await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: updates },
        { new: true, runValidators: true },
    )
    return res.status(200).json({
        success: true,
        data: await User.findById(id),
        message:"Updated data"
    });
})

//update password or change password
export const changePassword=asyncHandler(async(req,res,next)=>{
    const {email, currentPass, newPass}= req.body;

    const user =await User.findOne({email})

    const passMatch=await bcrypt.compare(currentPass,user.password)

    if(!passMatch){
        const error = new Error("Your current password is incorrect");
        error.code = 401;
        return next(error);
    }

    const P_SALT = Number(process.env.PASS_SALT) || 10;
    user.password = bcrypt.hashSync(newPass, P_SALT);

    await user.save();

     const token = jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).json({
        success: true,
        message: "Password updated successfully",
        token
    });
})

export const softDeleteUser = asyncHandler(async (req, res, next) => {
    // const {email} = req.body;
    // const user = await User.findOne({email})

    const {id}=req.params;

    const user = await User.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            deletedAt: new Date() 
        },
        { new: true, runValidators: true }
    );

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Account deactivated. It will be permanently deleted in 30 days."
    });
})

export const restoreUser = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOneAndUpdate(
        { email, isDeleted: true }, 
        { 
            isDeleted: false, 
            deletedAt: null 
        },
        { new: true } 
    );

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

        return res.status(200).json({
            success: true,
            message: "Account restored successfully!",
            data: user
        });
})