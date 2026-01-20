import mongoose, {Schema} from "mongoose";
import category from "./category.model";

const productSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,

    },
    discount:{
        type:Number,
    },
    tags:{
        type:[String],
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    BrandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    status:{
        type:Number,
        required:true,
        default:1
    }
})

const product=mongoose.model("product",productSchema);
export default product;