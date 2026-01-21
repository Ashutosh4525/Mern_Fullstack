import User from "../Models/user.model";
import bcrypt from "bcrypt"

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

         const otp=generateOtp();

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

