import brand from "../Models/brand.model.js";

export const createBrand=async (req,res) => {
    try {
         const data=req.body;
         console.log(data);

         const {name,description,status}=req.body;
         console.log(name,description);
         const statusval=Number(status)
         const cat= new brand({name,description,status:statusval})

         const savedBrand=await cat.save();

          return res.status(201).json({
            data:savedBrand,
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

export const getBrand=async (req,res) => {
    try {
         const cat= await brand.find();


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

export const updateBrand=async (req,res) => {
    try {
         const {id}=req.params;
         const cat= await brand.findById(id)

         if (!cat) {
            return res.status(400).json({
            message:"brand does not exist",
            success:false
        })}

        const catdata=req.body;
        console.log(catdata);

        const {name,description,status}=catdata;        
        const statusval = Number(status);
        const newcat=await brand.updateOne({_id:id},{name,description,status:statusval})
        console.log(newcat);
        
          return res.status(201).json({
            data: await brand.findById(id),
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

export const deleteBrand=async (req,res) => {
    try {
         const {id}=req.params;
         const cat= await brand.findById(id)

         if (!cat) {
            return res.status(400).json({
            message:"brand does not exist",
            success:false
        })}

        const delcat=await brand.updateOne({_id:id},{$set:{status:0}})
         return res.status(201).json({
            message:"brand deleted successfully",
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