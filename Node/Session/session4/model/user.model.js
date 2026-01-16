import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    age:Number,
    email:{
        type:String,
        required:true
    },
    status:Boolean
})

const User= mongoose.model("User",UserSchema);
export default User;