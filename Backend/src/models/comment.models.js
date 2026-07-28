import mongoose from "mongoose";
const Comment_schema = new mongoose.Schema(
    {
        content : {
            type : String,
            required : true,
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true,
        },
        post : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post",
            required : true,
        },
    },{timestamps:true}
)
const Comment = mongoose.model('Comment',Comment_schema);
export default Comment;