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
        enum:["admin", "user"],
        default:"user"
    },
    // otp: String,
    // otpExpires: Date,
    // isEmailVerified: {
    //     type: Boolean,
    //     default: false
    // },
    // isDeleted:{
    //     type:Boolean,
    //     default:false
    // },
    // deletedAt: {
    //     type: Date,
    //     default: null,
    // },
    rental:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rental"
    }],
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        }
        ],
    otp: String,
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
        index: { 
            expireAfterSeconds: 30 * 24 * 60 * 60,  
            partialFilterExpression: { isDeleted: true }  
        }
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next();
    const saltRounds = Number(process.env.PASS_SALT)
    this.password= bcrypt.hashSync(this.password,saltRounds)
    next()
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("otp")) return next();
     const Otp_Salt = Number(process.env.OTP_SALT)
     this.otp=bcrypt.hashSync(this.otp,Otp_Salt)
     next();
});

userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.isOtpCorrect = async function (userInputOtp) {
    return await bcrypt.compare(userInputOtp, this.otp);
};

userSchema.methods.generateOTP = function () {
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const rawOtp=crypto.randomInt(100000,999999).toString();
    this.otp = rawOtp;
    this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
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