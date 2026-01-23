import product from "../Models/product.model";
import brand from "../Models/brand.model";
import category from "../Models/category.model";

export const createProduct= async (req,res) => {
    try {
        const {name, description, BrandId,CategoryId, price, discount, tags}=req.body;

        const existingBrand= await brand.findById(BrandId);
        const existingCategory= await brand.findById(CategoryId);
        if (!existingBrand) {
            return res.status(400).json({
            message:"category does not exist",
            success:false
            })}

        if (!existingCategory) {
            return res.status(400).json({
            message:"category does not exist",
            success:false
            })}
        

        const newProduct = await product.create({name, description, BrandId, price, discount, tags, CategoryId})

         return res.status(201).json({
            data:newProduct,
            message:"All Good",
            success:true
        })
        } catch (error) {
         console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}

export const getProduct= async (req,res) => {
    try {
        const products=await product.find().populate("BrandId","CategoryId");

        return res.status(201).json({
            data:products,
            message:"All Good",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false})
    }
}