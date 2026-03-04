import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jwt"

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
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    role:{
        type:[String],
        enum:["admin", "user"],
        default:["admin"]
    },
    otp: String,
    otpExpires: Date,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    rental:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rental"
    }],
    otp: String,
    otpExpires: Date,
    isEmailVerified: {
        type: Boolean,
        default: false
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
},{Timestamp:true})

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next();
    this.password=bcrypt.hashSync(this.password,process.env.PASS_SALT)
    next()
})

userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            role:this.role,
            firstname:this.firstname,
            lastname:this.lastname,
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