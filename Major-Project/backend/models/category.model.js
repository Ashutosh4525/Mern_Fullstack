import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        lowercase: true
        // unique:true
    },
    description:{
        type:String,
    },
    // type:{
    //     type:String,
    //     enum:['Movie', 'TV-Show'],
    //     required:true
    // },
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
},{timestamps:true})
categorySchema.index({ isDeleted: 1 });
const Category=mongoose.model("Category", categorySchema);
export default Category;