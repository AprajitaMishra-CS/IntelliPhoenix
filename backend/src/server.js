import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/notifications", notificationRoutes);

// Basic API Routes 
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "IntelliPhoenix API is running !!",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`IntelliPhoenix server is running on port ${PORT}`);
        });
    } catch(error) {
        console.error("Failed to start server: ", error.message);
        process.exit(1);
    }
}

startServer();