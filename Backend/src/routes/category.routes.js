import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { createCategory,getAllCategories } from "../controller/category.controller.js";
const router = Router()
router.post("/create", verifyJWT, createCategory);
router.get("/", getAllCategories);
export default router;