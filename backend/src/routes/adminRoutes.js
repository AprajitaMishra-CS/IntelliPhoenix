import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { createDoctor, getAdminStats, getAllPatients, getAllDoctors, getAllAppointments, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.post("/doctors", authMiddleware, authorizeRoles("admin"), createDoctor);
router.get("/stats", authMiddleware, authorizeRoles("admin"), getAdminStats);
router.get("/patients", authMiddleware, authorizeRoles("admin"), getAllPatients);
router.get("/doctors", authMiddleware, authorizeRoles("admin"), getAllDoctors);
router.get("/appointments", authMiddleware, authorizeRoles("admin"), getAllAppointments);
router.get("/users", authMiddleware, authorizeRoles("admin"), getAllUsers);

export default router;