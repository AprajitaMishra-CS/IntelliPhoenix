import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";

export async function createDoctor(req, res) {
    try {
        const {fullName, email, phone, password} = req.body;

        if(typeof fullName !== "string" || !fullName.trim() || typeof email !== "string" || !validator.isEmail(email.trim()) || typeof phone !== "string" || !phone.trim() || typeof password !== "string" || password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Provide a name, valid email, phone number and a Password of at least 8 characters.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({email: normalizedEmail});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const doctor = await User.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            phone: phone.trim(),
            dob: req.body.dob,
            gender: req.body.gender,
            address: {
                city: req.body.address.city,
                state: req.body.address.state,
                country: req.body.address.country,
            },
            password: hashedPassword,
            acceptedTerms: true,
            role: "doctor",
        });

        try {
            const admins = await User.find({ role: "admin" }).select("_id");

            if(admins.length > 0){
                await Notification.insertMany(
                    admins.map((admin) => ({
                        recipient: admin._id,
                        title: "New Doctor Added",
                        message: `Dr. ${doctor.fullName} has been added to IntelliPhoenix.`,
                        type: "System",
                    }))
                );
            }
        } catch(error) {
            console.error("Admin notification error: ", console.error);
        }

        return res.status(201).json({
            success: true,
            message: "Doctor account created successfully !!",
            doctor: {
                id: doctor._id,
                name: doctor.fullName,
                email: doctor.email,
                role: doctor.role, 
            },
        });

    } catch(error) {
        if(error.code === 11000){
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        if(error.name === "ValidationError"){
            console.error("Doctor validation details: ", error.errors);
            return res.status(400).json({
                success: false,
                message: "Please provide all valid doctor profile details.",
                errors: Object.values(error.errors).map((item) => ({
                    field: item.path,
                    message: item.message,
                })),
            });
        }

        console.error("Create doctor error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not create doctor account.",
        });
    }
}

export async function getAdminStats(req, res){
    try {
        const [ totalUsers, totalPatients, totalDoctors, totalAppointments, pendingAppointments, confirmedAppointments, completedAppointments, ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: "patient" }),
            User.countDocuments({ role: "doctor" }),
            Appointment.countDocuments(),
            Appointment.countDocuments({ status: "pending" }),
            Appointment.countDocuments({ status: "confirmed" }),
            Appointment.countDocuments({ status: "completed" }),
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers, 
                totalPatients, 
                totalDoctors, 
                totalAppointments, 
                pendingAppointments, 
                confirmedAppointments, 
                completedAppointments,
            },
        });

    } catch(error) {
        console.error("Admin stats error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch admin statistics",
        });
    }
}

// count of patients
export async function getAllPatients(req, res){
    try {
        const patients = await User.find({ role: "patient" })
        .select("fullName email phone gender dob")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: patients.length,
            patients,
        });

    } catch(error) {
        console.log("Get all patient error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch patients",
        });
    }
}

// count of doctor
export async function getAllDoctors(req, res){
    try {
        const doctors = await User.find({ role: "doctor" })
        .select("fullName email phone gender dob")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: doctors.length,
            doctors,
        });

    } catch(error) {
        console.log("Get all doctors error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch doctors",
        });
    }
}

// get all appointments 
export async function getAllAppointments(req, res) {
    try {
        const appointments = await Appointment.find()
        .populate("patient", "fullName email phone")
        .populate("doctor", "fullName email phone")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });

    } catch(error) {
        console.error("Get all appointment error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch appointments.",
        });
    }
}

// get all users
export async function getAllUsers(req, res) {
    try {
        const users = await User.find()
        .select("fullName email phone role gender createdAt")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch(error) {
        console.error("Get all users error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch Users.",
        });
    }
}