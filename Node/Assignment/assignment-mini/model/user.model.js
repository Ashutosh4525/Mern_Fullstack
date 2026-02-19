import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        // required:true
        trim:true
    },
    lastname:{
        type:String,
        // required:true
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:[String],
        enum:["admin","user"],
        default:["user"]
    },
    avatar:{
        // type:String,
        localPath: {type:String},
        // trim:true,
        cloudinary: {
           public_id: { type: String },
           url: { type: String }
        }
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
        index: { 
            expireAfterSeconds: 30 * 24 * 60 * 60,  
            partialFilterExpression: { isDeleted: true }  
        }
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);
export default User;