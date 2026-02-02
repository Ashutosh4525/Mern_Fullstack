import multer from "multer";
import fs from "fs";
import path from "path";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads")
        }
        cb(null, "./uploads")
    },

    filename:(req,file,cb)=>{
        const ogname=file.originalname;
        const name=path.parse(ogname).name;   ///ogname without extenstion
        const ext=path.parse(ogname).ext   //just the extenstion
        const uniqueval=Date.now();
        const newName=name+"--"+uniqueval+ext;
        cb(null,newName);
    }
})
const uploads=multer({storage:storage});
export default uploads;