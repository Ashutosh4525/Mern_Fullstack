import User from "../Models/user.model";
import bcrypt from "bcrypt"
import Otp from "../Models/otp.model";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/app";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const createUser=async (req,res) => {
    try {

        const {firstname,lastname,email,password,role}=req.body;
        console.log(firstname,lastname,email,password,role);

        const finduser=await User.findOne({email})

       
        if (finduser) {
            return res.status(409).json({
                message:"this email already exist",
                // data: {
                //     id: newuser._id,
                //     email: newuser.email
                // }
                success: false
            })
        }

        const SALT = Number(process.env.SALT);

        const hashedPassword=bcrypt.hashSync(password,SALT);
        console.log(hashedPassword);
        
        const newuser=await User.create({firstname,lastname,role,email,password:hashedPassword});

        //  const otp=generateOtp();

        // await Otp.create({
        //     userId: newuser._id,
        //     otp,
        //     expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        // })

        // await sendOtpEmail(email, otp);

        //  return res.status(201).json({
        //     message: "User registered. OTP sent to email.",
        //     success: true
        //     });
        return res.status(200).json({
            data:newuser,
            message:"All Good",
            success:true
        })
        
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}

export const login=async(req,res)=>{
    try {
        let {email,password}=req.body;

        // check if user exist or not
        const existingUser=await User.findOne({email});
        
        if (!existingUser) {
           return res.status(404).json({
            message:"User not found",
            success:false
        }) 
        }

        // password match
        const compare =bcrypt.compareSync(password,existingUser.password)
        console.log(compare);
        if (!compare) {
            return res.status(401).json({
                message:"Invalid credential",
                success:false
            })
        }
        // generate token
        const token= jwt.sign({id:existingUser._id},process.env.TOKEN_SECRET_KEY,{expiresIn:"1h"});
        console.log(token);
        
        return res.status(200).json({
            data:existingUser,
            token,
            message:"User Logged in",
            success:true
        })
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}



export const sendOtpOnly = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false
      });
    }

    const otp = generateOtp();

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to send OTP",
      success: false
    });
  }
};
