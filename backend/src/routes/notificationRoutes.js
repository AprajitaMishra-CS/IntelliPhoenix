import express from "express";
import { getMyNotification, markNotificationAsRead } from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/my", authMiddleware, authorizeRoles("patient", "doctor", "admin"), getMyNotification);
router.patch("/:notificationId/read", authMiddleware, authorizeRoles("patient", "doctor", "admin"), markNotificationAsRead);

export default router;