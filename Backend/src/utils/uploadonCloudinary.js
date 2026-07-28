import cloudinary from "../config/cloudinary.js";
import fs from 'fs';
const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath)return null;
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type : "auto",
            }
        );
        fs.unlinkSync(localFilePath);
        return response;
    }catch (error) {
        console.error("Cloudinary Upload Error:");
        console.error(error);
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

export default uploadOnCloudinary;