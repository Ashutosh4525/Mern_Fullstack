import category from "../Models/category.model.js";

export const createCategory=async (req,res) => {
    try {
         const data=req.body;
         console.log(data);

         const {name,description,status}=req.body;
         console.log(name,description,status);
         
         const cat= new category({name,description,status})

         const res=await cat.save();

          return res.status(201).json({
            data:res,
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

export const getCategory=async (req,res) => {
    try {
         const cat= await category.find();


          return res.status(200).json({
            data:cat,
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

export const updateCategory=async (req,res) => {
    try {
         const {id}=req.params;
         const cat= await category.findById(id)

         if (!cat) {
            return res.status(400).json({
            message:"category does not exist",
            success:false
        })}

        const catdata=req.body;
        console.log(catdata);

        const {name,description,status}=catdata;        
        const newcat=await category.updateOne({_id:id},{name,description,status})
        console.log(newcat);
        
          return res.status(201).json({
            data:cat,
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

export const deleteCategory=async (req,res) => {
    try {
         const {id}=req.params;
         const cat= await category.findById(id)

         if (!cat) {
            return res.status(400).json({
            message:"category does not exist",
            success:false
        })}

        const delcat=await category.updateOne({_id:id},{$set:{status:0}})
         return res.status(201).json({
            message:"cat deleted successfully",
            success:true
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Somethhing went wrong",
            success:false
        })
    }
}