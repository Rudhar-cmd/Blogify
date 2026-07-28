import asyncHandler from '../utils/asynchandler.js'
import Post from '../models/post.models.js';
import Likes from '../models/likes.models.js'
import Comment from '../models/comment.models.js';
import uploadOnCloudinary from '../utils/uploadonCloudinary.js';
import { Category } from '../models/category.model.js';

const createPost = asyncHandler(async(req,res)=>{
    const {title,content,category} = req.body;
    if(!title || !content||!category){
        return res.status(400).json({
            message : "Title or Content or Categoryis Empty"
        })
    }
    const ExistingCategory = await Category.findById(category);
    if(!ExistingCategory){
        return res.status(403)
        .json({
            message : "Category Not Found",
        })
    }
    const image = await uploadOnCloudinary(req.file?.path);
    if(!image){
        return res.status(400).json({
            message : "Image is Required"
        })
    }
    const PostCreate = await Post.create(
        {
            title,
            content,
            image : image.secure_url,
            author : req.user._id,
            category
        }
    )
    return res.status(201).json({
        message: "Post Created Successfully",
        post: PostCreate,
    });
})

const getAllPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find()
    .populate("author", "username avatar")
    .populate("category", "name")
    .sort({ createdAt: -1 });

const result = await Promise.all(
    posts.map(async (post) => {

        const likesCount = await Likes.countDocuments({
            post: post._id
        });

        const commentsCount = await Comment.countDocuments({
            post: post._id
        });

        return {
            ...post.toObject(),
            likesCount,
            commentsCount
        };
    })
);

return res.status(200).json({
    posts: result
});

});

const getPostById = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
        .populate("author", "username avatar")
        .populate("category", "name");

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found"
        });
    }

    return res.status(200).json({
        post
    });
});

const updatePost = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404)
        .json({
            message : "Post Not Found"
        })
    }
    if(post.author.toString() !== req.user._id.toString()){
        return res.status(403)
        .json({
            message : "You are not authorized to update this post"
        })
    }
   
    let UpdateImage;

    const Image = req.file?.path

    if(Image){
        UpdateImage = await uploadOnCloudinary(Image)
    }
    
    const {title,content} = req.body;
    const postUpdate = await Post.findByIdAndUpdate(
        req.params.id,
        {
            $set : {
                title : title || post.title,
                content : content || post.content,
                image : UpdateImage ? UpdateImage.secure_url : post.image,
            }
        },
        {
            returnDocument: "after"
        }
    )
    return res.status(200)
    .json({
        message : "Post Updated SuccessFully",
        post : postUpdate
    })
})

const deletePost = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(404)
        .json({
            message : "Post Not Found"
        })
    }
    if(post.author.toString() !== req.user._id.toString()){
        return res.status(403)
        .json({
            message : "You are not authorized to Delete this post"
        })
    }
    const Delete = await Post.findByIdAndDelete(req.params.id);
    return res.status(200)
    .json({
        message : "Post Has been Deleted",
        post : Delete,
    })
})

const searchPost = asyncHandler(async(req,res)=>{
    const {query} = req.query;
    const posts = await Post.find({
        $or : [
            {title : {$regex : query,$options:'i'}},
            {content : {$regex : query,$options:'i'}}
        ]
    });
    return res.status(200)
    .json({
        posts
    });
});

export{createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPost};