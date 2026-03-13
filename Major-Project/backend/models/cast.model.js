import mongoose from "mongoose";

const castSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    profileImage:{
        url:String,
        public_id:String
    },
    bio:{
        type:String
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

const Cast=mongoose.model("Cast",castSchema)
export default Cast;