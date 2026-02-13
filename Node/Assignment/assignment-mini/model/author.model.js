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
    bio:{
        type:String,
        // unique:true
    },
    birthDate:{
        type:Date,
        required:true,
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

authorSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });
const Author=mongoose.model("Author",authorSchema);
export default Author;