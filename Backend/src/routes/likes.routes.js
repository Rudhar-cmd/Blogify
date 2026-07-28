import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    LikePost,
    getPostLikes,
    getLikedPosts
} from "../controller/likes.controller.js";

const router = Router();

router.post("/toggle/:postId", verifyJWT, LikePost);


router.get("/count/:postId", getPostLikes);


router.get("/my-likes", verifyJWT, getLikedPosts);

export default router;