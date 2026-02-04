import brand from "../Models/brand.model.js";
import uploads from "../Middleware/upload.middleware.js";
import multer from "multer";
export const createBrand=async (req,res) => {
    try {
        //  const data=req.body;
        //  console.log(data);

        // const fileWithUploads=uploads.single("logo");

        // const fileWithUploads=uploads.fields([
        //     {name:"logo", maxCount:1},
        //     {name:"images", maxCount:5}
        // ])
        // fileWithUploads(req,res, async function (err) {
        //     console.log("Multer Error"+err);
        //     if (err) {
        //       return res.status(400).json({
        //         message:"Wrong wiyh multer",
        //         success:false
        //     })  
        //     }
            const {name,description,status}=req.body;

         const logo=req.files && req.files.logo && req.files.logo[0] ? req.files.logo[0].filename:null

         const images=req.files && req.files.images ? req.files.images.map(f=>f.filename):[];
        
         const statusval=Number(status)
          console.log(name,description,logo,images);
        //  const cat= new brand({name,description,status:statusval})

        //  const savedBrand=await cat.save();

        const cat= await brand.create({name, description,logo,images,status:statusval})

          return res.status(201).json({
            data:cat,
            message:"All Good",
            success:true
        })
        // }
    // )
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
            path:"http://localhost:8000/image/",
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

        // const fileWithUploads=uploads.single("logo");
        // const fileWithUploads=uploads.fields([
        //     {name:"logo", maxCount:1},
        //     {name:"images", maxCount:5}
        // ])
        // fileWithUploads(req,res, async function (err) {
        //     console.log("Multer Error"+err);
        //     if (err) {
        //       return res.status(400).json({
        //         message:"Wrong wiyh multer",
        //         success:false
        //     })  
        //     }
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

        let logo=cat.logo
        let images=cat.images
        if (req.files?.logo?.[0]) {
            logo = req.files.logo[0].filename;
        }

        if (req.files?.images) {
            images = req.files.images.map(f => f.filename);
        }
        const statusval = Number(status);
        const newcat=await brand.updateOne({_id:id},{name,description,status:statusval,logo,images})
        console.log(newcat);
        
          return res.status(201).json({
            data: await brand.findById(id),
            message:"All Good",
            success:true
        })
        // })
         
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
        // const fileWithUploads=multer.single("logo");
        // fileWithUploads(req,res,async function (err) {
        //     console.log("Multer Error"+err);
        //     if (err) {
        //       return res.status(400).json({
        //         message:"Wrong wiyh multer",
        //         success:false
        //     })  
        //     }
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
        // })
         
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}