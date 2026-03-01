import mongoose from "mongoose";

const movieSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String
    },
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    poster:{
        type:String,
    },
    trailer:{
        type:String,
    },
    video:{
        type:String
    },
    rentalPrice:{
        type:Number
    },
    duration:{
        type:Number,
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
},{Timestamp:true});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;