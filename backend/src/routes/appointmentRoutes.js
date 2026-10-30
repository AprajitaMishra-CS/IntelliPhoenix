import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { getDoctors, bookAppointment, getMyAppointment, cancelAppointment, getDoctorAppointments, updateAppointmentStatus, getDoctorStats, getMyPatients } from "../controllers/appointmentCont.js";

const router = express.Router();

// patient route
router.get("/doctors", authMiddleware, authorizeRoles("patient"), getDoctors);
router.post("/", authMiddleware, authorizeRoles("patient"), bookAppointment);
router.get("/my", authMiddleware, authorizeRoles("patient"), getMyAppointment);
router.patch("/:appointmentId/cancel", authMiddleware, authorizeRoles("patient"), cancelAppointment);

// doctor route
router.get("/doctor/my", authMiddleware, authorizeRoles("doctor"), getDoctorAppointments);
router.patch("/:appointmentId/status", authMiddleware, authorizeRoles("doctor"), updateAppointmentStatus);
router.get("/doctor/stats", authMiddleware, authorizeRoles("doctor"), getDoctorStats);
router.get("/doctor/patients", authMiddleware, authorizeRoles("doctor"), getMyPatients);

export default router;