import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        url: String,
        public_id: String
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user',
        select: true
    },
    rental:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rental"
    }],
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Content"
        }
        ],
    otp: {
        type:String,
        select:false
    },
    otpExpires: Date,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        select:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt: {
        type: Date,
        default: null,
    }
},{timestamps:true})

userSchema.pre("save",async function () {
    if (!this.isModified("password")) return ;
    const saltRounds = Number(process.env.PASS_SALT)
    this.password= bcrypt.hash(this.password,saltRounds)
})

userSchema.pre("save", async function () {
    if (!this.isModified("otp")) return ;
     const Otp_Salt = Number(process.env.OTP_SALT)
     this.otp=bcrypt.hash(this.otp,Otp_Salt);
});

userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.isOtpCorrect = async function (userInputOtp) {
    return await bcrypt.compare(userInputOtp, this.otp);
};

userSchema.methods.generateOTP = function () {
    const rawOtp=crypto.randomInt(100000,999999).toString();
    this.otp = rawOtp;
    this.otpExpires = Date.now() + 5 * 60 * 1000; 
    return rawOtp;
};

userSchema.methods.generateAccessToken= function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            role:this.role,
            // firstname:this.firstname,
            // lastname:this.lastname,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function () {
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User=mongoose.model("User", userSchema);
export default User;