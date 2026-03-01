import mongoose from "mongoose";

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

const User=mongoose.model("User", userSchema);
export default User;