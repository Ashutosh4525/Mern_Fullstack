import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { asyncHandler } from "../middlewares/error.middleware";

function generateOtp() {
    const min=100000;
    const max=999999;
    const otp=crypto.randomInt(min,max);
    return otp;
}

export const createUser= asyncHandler(async (req,res,next) => {
     const {firstname,lastname,email,password,role,avatar}=req.body;
        console.log(firstname,lastname,email,password,role,avatar);
        const finduser=await User.findOne({email})

    if (finduser) {
        const error= new Error("this email already exist")
            error.code=401;
            // error.message=error;
            return next(error)
    }

    const P_SALT= Number(process.env.PASS_SALT);
    const hashedPassword=bcrypt.hashSync(password,P_SALT);
    console.log(hashedPassword);

    const newuser=await User.create({firstname,lastname,role,email,password:hashedPassword})
    
    return res.status(200).json({
            data:newuser,
            message:"All Good",
            success:true
        })
})

export const login=asyncHandler(async(req,res,next)=>{

    let {email,password}=req.body;

    const existingUser=await User.findOne({email})

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

    const token=jwt.sign({id:existingUser._id},process.env.TOKEN_SECRET_KEY,{expiresIn:"1d"})
    console.log(token);
    
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
    console.log(hashedPassword);

    const newUser=await User.create({
        email,
        password:hashedPassword
    })

    const token =jwt.sign({id:newUser._id},process.env.TOKEN_SECRET_KEY,{
        expiresIn:"1d"
    })
    return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        data: newUser
    });
})