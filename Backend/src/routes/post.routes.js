import {Router} from 'express'
import upload from '../middleware/multer.middleware.js'
import verifyJWT from '../middleware/auth.middleware.js'
import {createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,searchPost} from '../controller/post.controller.js'

const router = Router();
router.use((req, res, next) => {
    console.log("METHOD:", req.method);
    console.log("URL:", req.originalUrl);
    next();
});
router.post(
    '/create-post',
    verifyJWT,
    upload.single('image'),
    createPost
);
router.get("/search", searchPost);
router.get("/:id", getPostById);
router.get("/", getAllPosts);
router.patch(
    "/update-post/:id",
    verifyJWT,
    upload.single("image"),
    updatePost
);

router.delete(
    "/delete-post/:id",
    verifyJWT,
    deletePost
);

export default router;