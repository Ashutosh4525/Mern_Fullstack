import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
    }
},{Timestamp:true})

const Category=mongoose.model("Category", categorySchema);
export default Category;