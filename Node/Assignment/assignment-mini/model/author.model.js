import mongoose from "mongoose";

const authorSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    Bio:{
        type:String,
        unique:true
    },
    Birthdate:{
        type:Date,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Author=mongoose.model("Author",authorSchema);
export default Author;