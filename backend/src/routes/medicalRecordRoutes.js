import express from "express";
import { getMyMedicalRecords, createMedicalRecord } from "../controllers/medicalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/my", authMiddleware, authorizeRoles("patient"), getMyMedicalRecords);
router.post("/", authMiddleware, authorizeRoles("patient"), createMedicalRecord);

export default router;