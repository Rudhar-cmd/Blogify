import asyncHandler from "../utils/asynchandler.js";
import {Category} from '../models/category.model.js'
const createCategory = asyncHandler(async(req,res)=>{
    const {name} = req.body;
    if(!name || !name.trim()){
        return res.status(409)
        .json({
            message : "Category Field Empty"
        })
    }
    const existCategory = await Category.findOne({name})
    if(existCategory){
        return res.status(403)
        .json({
            message : "Category Already Define"
        })
    }
    const CreateCategory = await Category.create({
        name : name.trim(),
    }) 
    return res.status(201)
    .json({
        message : "Category Added SuccesFully",
        category : CreateCategory,
    })
})
const getAllCategories = asyncHandler(async(req,res)=>{
    const category = await Category.find();
    return res.status(201)
    .json({
        message : "All Cetagories",
        category,
    })
})
export {createCategory,getAllCategories};