import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localPath) => {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: localPath.includes('avatars') ? 'library/users/avatars' : 'library/books/covers',
    resource_type: 'image',
    quality: 'auto'
  });
  fs.unlinkSync(localPath); 
  return {
    public_id: result.public_id,
    url: result.secure_url
  };
};

export const deleteCloudinaryImage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, { resource_type: 'image', invalidate: true });
};

export default cloudinary;