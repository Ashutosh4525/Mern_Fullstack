import mongoose from "mongoose";

const castSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    profileImage:{
        type:String,
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
},{Timestamp:true})

const Cast=mongoose.model("Cast",castSchema)
export default Cast;