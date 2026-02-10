import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        // required:true
    },
    lastname:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Array,
        value:["admin","user"],
        default:"user"
    },
    avatar:{
        type:String
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

userSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });
const User=mongoose.model("User",userSchema);
export default User;