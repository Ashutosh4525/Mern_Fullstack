import {v2 as cloudinary} from cloudinary;
import fs from "fs"
// import dotenv from "dotenv";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api:process.env.CLOUDINARY_API_KEY,
    cloud_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response=cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image'
        })

        console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary} 