import express from "express";
import { createContactMessage, getAllContactMessage, updateContactMessageStatus } from "../controllers/contactController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", authMiddleware, authorizeRoles("admin"), getAllContactMessage);
router.patch("/:id/status", authMiddleware, authorizeRoles("admin"), updateContactMessageStatus);

export default router;