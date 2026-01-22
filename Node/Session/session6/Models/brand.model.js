import mongoose, {Schema} from "mongoose";

const brandSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
    },
    logo:{
        type:String,
    },
    status:{
        type:Number,
        default:1
    }
})

const brand=mongoose.model("Brand", brandSchema);
export default brand;
