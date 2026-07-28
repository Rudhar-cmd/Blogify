import Likes from "../models/likes.models.js";
import Post from "../models/post.models.js";
import asyncHandler from "../utils/asynchandler.js";

const LikePost = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.postId)
    if(!post){
        return res.status(404)
        .json({
            message : "Post Not Found",
        })
    }
    let LikeExist = await Likes.findOne({
        user : req.user._id,
        post : req.params.postId,
    })
    if(!LikeExist){
        LikeExist = await Likes.create({
            user : req.user._id,
            post : req.params.postId
        })
        return res.status(200)
    .json({
        message : "Like",
        Liked : true,
    })
    }
    else{
        await LikeExist.deleteOne();
        return res.status(200)
    .json({
        message : "UnLike",
        Liked : false,
    })
    }
})

const getPostLikes = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.postId)
    if(!post){
        return res.status(404)
        .json({
            message : "Post Not Found",
        })
    }
    const count = await Likes.countDocuments({
        post : req.params.postId,
    })
    return res.status(200)
    .json({
        count
    })
})

const getLikedPosts = asyncHandler(async(req,res)=>{
    const Posts = await Likes.find({
        user : req.user._id,
    }).populate("post");
    return res.status(200)
    .json({
        Posts,
    })
})

export {LikePost,getPostLikes,getLikedPosts};