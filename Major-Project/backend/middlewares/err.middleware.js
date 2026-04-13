export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch(next)
    }
}

const errorHandler=(error,req,res,next)=>{
    // console.log(error);
    
    return res.status(error.code||500).json({
        success:false,
        message:error.message||"Something went wrong",
        ...(error.details && { details: error.details })
    })
}

export default errorHandler