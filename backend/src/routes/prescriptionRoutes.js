import express from "express";
import { createPrescription, getMyPrescription, getMyIssuedPrescriptions } from "../controllers/prescriptionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

// patient view their prescription
router.get("/my", authMiddleware, authorizeRoles("patient"), getMyPrescription);

// doctor view prescription they have issued
router.get("/issued", authMiddleware, authorizeRoles("doctor"), getMyIssuedPrescriptions);

// only doctors can issue prescription
router.post("/", authMiddleware, authorizeRoles("doctor"), createPrescription);

export default router;