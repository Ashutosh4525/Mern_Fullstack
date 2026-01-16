import category from "../model/categories.model";

export const createcategory=async (req,res) => {
    try {

        const {name, description}=req.body;
        const categories=new category({name,description})
        const result=await categories.save();
        return res.status(201).json({
            data:result,
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