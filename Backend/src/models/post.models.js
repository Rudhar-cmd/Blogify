import mongoose from "mongoose";
const post_schema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
        },
        content : {
            type : String,
            required : true,
        },
        image : {
            type : String,
        },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true,
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required : true,
        }
    },{timestamps:true}
)
const Post = mongoose.model('Post',post_schema)
export default Post;
