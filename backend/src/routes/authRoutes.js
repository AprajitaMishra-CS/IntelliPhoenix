import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authentication successful.",
        user: req.user,
    });
});

// Role based protected route
router.get("/patient-test", authMiddleware, authorizeRoles("patient"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Patient access granted",
        user: req.user,
    });
});

export default router;