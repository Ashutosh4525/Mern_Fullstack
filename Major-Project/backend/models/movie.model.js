import mongoose from "mongoose";

const movieSchema=mongoose.Schema({
    // title:{
    //     type:String,
    //     trim:true,
    //     required:true
    // },
    // description:{
    //     type:String
    // },
    // type:{
    //     type:String,
    //     enum: ["movie", "tv"],
    //     required:true
    // },
    // categoryIDs:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Category",
    //     required:true
    // }],
    // poster:{
    //     url:String,
    //     public_id:String
    // },
    // trailer:{
    //     url:String,
    //     public_id:String
    // },
    // rentalPrice:{
    //     type:Number
    // },
     contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    video:{
        url:String,
        public_id:String
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
        // index: { 
        //     expireAfterSeconds: 30 * 24 * 60 * 60,  
        //     partialFilterExpression: { isDeleted: true }  
        // }
    }
},{timestamps:true});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;