import mongoose from "mongoose";

const movieCastSchema=mongoose.Schema({
    movieID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    },
    castID:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Cast" 
    }
},{Timestamp:true});

const MovieCast=mongoose.model("MovieCast",movieCastSchema);
export default MovieCast;