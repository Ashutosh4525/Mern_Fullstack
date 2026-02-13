import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        index: true
    },
    coverImage:{
        localPath: {type:String},
        cloudinary: {
            public_id: {type:String},
            url: {type:String}
        }
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
    deletedAt: {
        type: Date,
        default: null,
        index: { 
            expireAfterSeconds: 30 * 24 * 60 * 60,  
            partialFilterExpression: { isDeleted: true }
        } 
    }
},{timestamps:true})

// bookSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });
const Book=mongoose.model("Book",bookSchema);
export default Book;