import multer from "multer";
import fs from "fs";
import path from "path";
import { generateOtp } from "../controller/user.controller";

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        if(!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads")
        }
        cb(null, "./uploads")
    },

    filename:(req,file,cb)=>{
        const ogname=file.originalname;
        const name=path.parse(ogname).name;
        const ext=path.parse(ogname).ext;
        const uniqueval=Date.now()+generateOtp();
        const newName=name+"--"+uniqueval+ext;
        cb(null,newName);
    }
})
const uploads=multer({storage:storage});
export default uploads;