import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { checkSymptoms } from "../controllers/symptomController.js";

const router = express.Router();

router.post(
    "/check",
    authMiddleware,
    authorizeRoles("patient"),
    checkSymptoms,
);

export default router;