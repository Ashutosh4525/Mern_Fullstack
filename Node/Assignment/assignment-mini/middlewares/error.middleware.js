const errorHandler=(error, req, res, next)=>{
    console.log("Error", error)

    return res.status(error.code||500).json({
        success: false,
        message:error.message||"Something went wrong"
    })
}

export default errorHandler