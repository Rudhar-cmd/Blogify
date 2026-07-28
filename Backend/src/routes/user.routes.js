import { Router } from "express";
import {loginUser, logoutUser, registerUser, currentUser,changePassword,updateDetails,avatar,getProfile} from '../controller/user.controller.js'
import verifyJWT from '../middleware/auth.middleware.js'
import upload from "../middleware/multer.middleware.js";
const router = Router()
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

router.get("/current-user", verifyJWT, currentUser);

router.patch("/change-password", verifyJWT, changePassword);
router.patch("/update-account", verifyJWT, updateDetails);
router.patch("/update-avatar", verifyJWT, upload.single("avatar"), avatar);
router.get("/profile", verifyJWT, getProfile);
export default router;