import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    coverImage:{
        type:String
    },
    authorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    publishedDate:{
        type:Date,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

// bookSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });
const Book=mongoose.model("Book",bookSchema);
export default Book;