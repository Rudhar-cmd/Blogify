import mongoose from "mongoose";
const Category_Schema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            unique : true,
            trim: true,
        }
    },
    {timestamps:true}
)
export const Category = mongoose.model('Category',Category_Schema)