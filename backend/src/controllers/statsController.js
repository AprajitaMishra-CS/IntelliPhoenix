import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

export const getPublicStats = async (req, res) => {
    try {
        const [patients, doctors, appointments] = await Promise.all([
            User.countDocuments({
                role: "patient",
                isActive: { $ne: false },
            }),

            User.countDocuments({
                role: "doctor",
                isActive: { $ne: false },
            }),

            Appointment.countDocuments(),
        ]);

        res.status(200).json({
            success: true,
            stats: {
                patients,
                doctors,
                appointments,
                totalUsers: patients + doctors,
            },
        });

    } catch (error) {
        console.error("Stats fetch error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch application statistics",
        });
    }
};