import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

const Book=mongoose.model("Book",bookSchema);
export default Book;