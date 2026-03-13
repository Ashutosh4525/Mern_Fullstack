import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
// import dotenv from "dotenv";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath, folderName) => {
    try {
        if(!localFilePath) return null

        const response= await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: `movie-site/${folderName}`,
            use_filename: true
        })

        console.log("file is uploaded on cloudinary", response.url);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        // fs.unlinkSync(localFilePath)
        //  if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        // return response
        return {
            url: response.secure_url,
            public_id: response.public_id
        }
        
    } catch (error) {
         if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }

        console.error("Cloudinary upload error:", error)
        return null;
    }
}

export {uploadOnCloudinary} 