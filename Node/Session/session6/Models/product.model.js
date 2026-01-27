import mongoose, {Schema} from "mongoose";
import category from "./category.model";
import brand from "./brand.model";

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
        // type:[String],
        // required:true
        type:Array,
        default:[]
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: category
    },
    BrandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: brand
    },
    status:{
        type:Number,
        required:true,
        default:1
    },
    inStock:{
        type:Boolean,
        default: true
    }
})

const product=mongoose.model("product",productSchema);
export default product;