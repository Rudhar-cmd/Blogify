import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { createComment,updateComment,GetAllComments,DeleteComment } from "../controller/comment.controller.js";

const router = Router()

router.post("/:postId", verifyJWT, createComment);

router.get("/:postId", GetAllComments);

router.patch("/:commentId", verifyJWT, updateComment);

router.delete("/:commentId", verifyJWT, DeleteComment);

export default router;