import MovieCast from "../models/moviecast.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";

export const createMovieCast = asyncHandler(async (req,res,next)=>{

    const {movieID, castID} = req.body

    if(!movieID || !castID){
    const error = new Error("movieID and castID required")
    error.code = 400
    return next(error)
    }

    const existingRelation = await MovieCast.findOne({ movieID, castID });
    if (existingRelation) {
        const error = new Error("This cast member is already assigned to this movie");
        error.code = 400;
        return next(error);
    }

    const relation = await MovieCast.create({
    movieID,
    castID
    })

    return res.status(201).json({
    success:true,
    data:relation,
    message:"Cast added to movie"
    })

})

export const getMovieCast = asyncHandler(async (req,res)=>{

    const cast = await MovieCast.find({movieID:req.params.movieId})
    .populate("castID")

    return res.json({
    success:true,
    data:cast
    })

})

export const deleteMovieCast = asyncHandler(async (req,res,next)=>{

    const relation = await MovieCast.findByIdAndDelete(req.params.id)

    if(!relation){
        const error = new Error("Relation not found");
        error.code = 400;
        return next(error);
    }

    res.json({
    success:true,
    message:"Cast removed from movie"
    })

})