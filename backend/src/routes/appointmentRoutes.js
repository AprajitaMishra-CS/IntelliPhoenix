import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { getDoctors, bookAppointment, getMyAppointment, cancelAppointment } from "../controllers/appointmentCont.js";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("patient"));

router.post("/", bookAppointment);
router.get("/my", getMyAppointment);
router.patch("/:appointmentId/cancel", cancelAppointment);
router.get("/doctors", getDoctors);

export default router;