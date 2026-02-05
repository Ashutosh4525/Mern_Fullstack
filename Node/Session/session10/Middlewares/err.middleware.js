
const errorHandler=(err, req, res, next)=>{
    console.log("🚨ERROR", err);
        return res.status(500).json({
            message:err.message||"Something went wrong",
            success:false
        })
}
export default errorHandler