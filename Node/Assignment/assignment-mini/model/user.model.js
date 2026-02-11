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
        type:Array,
        value:["admin","user"],
        default:"user"
    },
    avatar:{
        type:String,
        trim:true
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
        default: null
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);
export default User;