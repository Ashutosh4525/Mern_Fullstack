import mongoose,{Schema} from "mongoose";

const categorySchema=new Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
    }
})

const category=mongoose.model("category",categorySchema)
export default category;