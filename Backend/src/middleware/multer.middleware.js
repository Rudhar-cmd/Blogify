import multer from 'multer'
import fs from "fs";

const uploadDir = "./public/temp";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
})
const upload = multer({
    storage,
})
export default upload;