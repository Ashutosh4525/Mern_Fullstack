import mongoose from "mongoose";

const movieCastSchema=mongoose.Schema({
    movieID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    },
    castID:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Cast" 
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
    },
},{timestamps:true});

const MovieCast=mongoose.model("MovieCast",movieCastSchema);
export default MovieCast;