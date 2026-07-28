import mongoose from "mongoose";
const likes_schema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        post : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post",
            required : true,
        }
    },{timestamps : true}
)
likes_schema.index(
    { user: 1, post: 1 },
    { unique: true }
);
const Likes = mongoose.model('Likes',likes_schema)
export default Likes;