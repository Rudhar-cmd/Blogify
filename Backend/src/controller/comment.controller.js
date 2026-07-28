import asyncHandler from "../utils/asynchandler.js";
import Comment from '../models/comment.models.js'
import Post from "../models/post.models.js";
const createComment = asyncHandler(async(req,res)=>{
    const checkPost = await Post.findById(req.params.postId);
    if(!checkPost){
        return res.status(404)
        .json({
            message : "Post Not Found",
        })
    }
    const {content} = req.body;
    if(!content){
        return res.status(400)
        .json({
            message : "Comment is Empty",
        })
    }
    const Createcomment = await Comment.create(
        {
            content,
            user : req.user._id,
            post : req.params.postId,
        }
    )
    return res.status(200)
    .json({
        message : "Comment Added",
        Comment : Createcomment,
    })
})

const GetAllComments = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.postId);
    if(!post){
        return res.status(404)
        .json({
            message : "Post Not Found"
        })
    } 
    const comments = await Comment.find({
        post: req.params.postId
    })
    .populate("user", "_id username avatar")
    .sort({ createdAt: -1 });
    return res.status(200)
    .json({
        comments,
    })
})

const updateComment = asyncHandler(async(req,res)=>{
    const checkcomment = await Comment.findById(req.params.commentId);
    if(!checkcomment){
        return res.status(404)
        .json({
            message : "Comment Not Found"
        })
    }
    const {UpdateComment} = req.body;
    if(!UpdateComment){
        return res.status(400)
        .json({
            message : "Field is Empty"
        })
    }
    if (!checkcomment.user.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized to update this comment"
        });
    }
    const Updated = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
            content : UpdateComment,
        },
        {
            returnDocument: "after",
        }
    )
    return res.status(200)
    .json({
        message : "Comment Updated SuccesFully",
        Updated
    })
})

const DeleteComment = asyncHandler(async(req,res)=>{
    const Check = await Comment.findById(req.params.commentId)
    if(!Check){
       return res.status(404)
        .json({
            message : "Comment Not Found"
        }) 
    }
    if (!Check.user.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized to Delete this comment"
        });
    }
    const Deleted = await Comment.findByIdAndDelete(req.params.commentId)
    return res.status(200)
    .json({
        message : "Comment Deleted SuccesFully",
        Deleted
    })
})

export {createComment,updateComment,GetAllComments,DeleteComment};