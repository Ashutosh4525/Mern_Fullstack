import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = "./public/temp"


if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const fileFilter = (req, file, cb) => {

   const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "video/mp4",
        "video/mkv",
        "video/quicktime"
    ]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type"), false)
    }
};

export const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 200 
    }
})