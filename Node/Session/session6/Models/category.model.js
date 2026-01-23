import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema= new Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    status:{
        type: Number,
        default:1
    }
})

const category=mongoose.model("Category", categorySchema);
export default category;