import mongoose from "mongoose";

const movieCastSchema=mongoose.Schema({
    // movieID:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Movie"
    // },
     contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    castID:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Cast",
       required:true, 
    },
    role: String,
    // isDeleted:{
    //     type:Boolean,
    //     default:false
    // },
    // deletedAt: {
    //     type: Date,
    //     default: null,
    //     index: { 
    //         expireAfterSeconds: 30 * 24 * 60 * 60,  
    //         partialFilterExpression: { isDeleted: true }  
    //     }
    // },
},{timestamps:true});
movieCastSchema.index({ contentId: 1, castID: 1 }, { unique: true });
const MovieCast=mongoose.model("MovieCast",movieCastSchema);
export default MovieCast;