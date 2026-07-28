import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/likes.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import cookieParser from "cookie-parser";
import categoryRoutes from './routes/category.routes.js';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Blog API is Running");
});

const port = process.env.PORT || 3001;

connectDB();

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use('/category',categoryRoutes);
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err);

    res.status(500).json({
        message: err.message
    });
});
app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
});

export { app };