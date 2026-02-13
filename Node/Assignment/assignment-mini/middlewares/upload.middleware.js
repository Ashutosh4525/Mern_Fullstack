import multer from "multer";
import fs from "fs";
import path from "path";
import { generateOtp } from "../controller/user.controller";

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};


// const ensureUploadsDir = () => {
//   const uploadsDir = './uploads';
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }
// };

// const userStorage=multer.diskStorage({
//     // destination:(req,res,cb)=>{
//     //     if(!fs.existsSync("./uploads")) {
//     //         fs.mkdirSync("./uploads")
//     //     }
//     //     cb(null, "./uploads")
//     // },
//     destination: (req, file, cb) => {
//     ensureUploadsDir();
//     cb(null, './uploads/avatars');
//   },

//     filename:(req,file,cb)=>{
//         const ogname=file.originalname;
//         const name=path.parse(ogname).name;
//         const ext=path.parse(ogname).ext;
//         const uniqueval=Date.now()+generateOtp();
//         const newName=name+"--"+uniqueval+ext;
//         cb(null,`avatars/${newName}`);
//     }
// })

// const userAvatarCloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'library/users/avatars',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ quality: 'auto', width: 200, height: 200, crop: 'fill' }]
//   }
// });

// export const userCloudUploads=multer({storage:userAvatarCloudinaryStorage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) cb(null, true);
//     else cb(new Error('Only images allowed'), false);
//   }
// });
// export const userUploads=multer({storage:userStorage});
// const bookStore=multer.diskStorage({
//     // destination:(req,res,cb)=>{
//     //     if(!fs.existsSync("./uploads")) {
//     //         fs.mkdirSync("./uploads")
//     //     }
//     //     cb(null, "./uploads")
//     // },
//     destination: (req, file, cb) => {
//     ensureUploadsDir();
//     fs.mkdirSync('./uploads/books', { recursive: true });
//     cb(null, './uploads/books');
//   },
//    filename:(req,file,cb)=>{
//         const ogname=file.originalname;
//         const name=path.parse(ogname).name;
//         const ext=path.parse(ogname).ext;
//         const uniqueval=Date.now()+generateOtp();
//         const newName=name+"--"+uniqueval+ext;
//         cb(null,`books/${newName}`);
//     }
// })

// const bookCoverCloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'library/books/covers',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ quality: 'auto', fetch_format: 'auto' }]
//   }
// });

// export const bookCloudUpload = multer({ 
//   storage: bookCoverCloudinaryStorage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) cb(null, true);
//     else cb(new Error('Only images allowed'), false);
//   }
// })

// export const bookStorage=multer({
//     storage:bookStore
// })

// export const cleanupLocalBackup = (localPath) => {
//   if (fs.existsSync(localPath)) {
//     fs.unlinkSync(localPath);
//   }
// };

export const userAvatarUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/avatars';
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const name = path.parse(file.originalname).name;
    const ext = path.parse(file.originalname).ext;
    const uniqueVal = Date.now() + generateOtp();
    cb(null, `${name}--${uniqueVal}${ext}`);
  }
});

export const avatarUpload = multer({ 
  storage: userAvatarUpload,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  }
});

export const bookCoverUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/book-covers';
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const name = path.parse(file.originalname).name;
    const ext = path.parse(file.originalname).ext;
    const uniqueVal = Date.now() + generateOtp();
    cb(null, `${name}--${uniqueVal}${ext}`);
  }
});

export const bookCoverMulter = multer({ 
  storage: bookCoverUpload,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  }
});