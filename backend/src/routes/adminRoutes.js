import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { createDoctor } from "../controllers/adminController.js";

const router = express.Router();

router.post("/doctors", authMiddleware, authorizeRoles("admin"), createDoctor);

export default router;