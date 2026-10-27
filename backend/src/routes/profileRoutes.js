import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMyProfile);
router.patch("/", authMiddleware, updateMyProfile);

export default router;