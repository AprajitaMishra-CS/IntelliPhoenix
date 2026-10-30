import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// booking appointment
export async function bookAppointment(req, res){
    try{
        const {doctorId, appointmentDate, reason} = req.body;
        if(!mongoose.isValidObjectId(doctorId)){
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID",
            });
        }

        const date = new Date(appointmentDate);

        if(!appointmentDate || Number.isNaN(date.getTime()) || date <= new Date()) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid future appointment date and time",
            });
        }

        if(typeof reason!=="string" || !reason.trim() || reason.trim().length > 500){
            return res.status(400).json({
                success: false,
                message: "Please enter a reason (maximum 500 characters)",
            });
        }

        const doctor = await User.findOne({
            _id: doctorId,
            role: "doctor",
        });

        if(!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const appointment = await Appointment.create({
            patient: req.user.userId,
            doctor: doctor._id,
            appointmentDate: date,
            reason: reason.trim(),
        });

        const patient = await User.findById(req.user.userId).select("fullName");

        await Notification.create({
            recipient: doctor._id,
            title: "New Appointment Request",
            message: `${patient?.fullName || "A Patient"} has booked an appointment. Please review the appointment request.`,
            type: "Appointment",
        });

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully", 
            appointment,
        });
    } catch(error){
        if(error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "This doctor already has an appointment at that time",
            });
        }

        console.error("Book Appointment error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to book appointment",
        });
    }
}

// get appointment belonging to logged-in patient
export async function getMyAppointment(req, res){
    try {
        const appointments = await Appointment.find({
            patient: req.user.userId,
        }) 
        .populate("doctor", "fullName email")
        .sort({ appointmentDate: 1});

        return res.status(200).json({
            success: true,
            appointments,
        });
    } catch(error) {
        console.error("Get appointments error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch appointments",
        });
    }
}

// cancel an appointment belonging to the logged-in patient
export async function cancelAppointment(req, res) {
    try{
        const { appointmentId } = req.params;

        if(!mongoose.isValidObjectId(appointmentId)){
            return res.status(400).json({
                success: false,
                message: "Invalid Appointment Id",
            });
        }

        const appointment = await Appointment.findOne({
            _id: appointmentId,
            patient: req.user.userId,
        });

        if(!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        if(!["pending", "confirmed"].includes(appointment.status)) {
            return res.status(400).json({
                success: false,
                message: "This appointment cannot be cancelled",
            });
        }

        appointment.status = "cancelled";
        await appointment.save();

        await Notification.create({
            recipient: appointment.doctor,
            title: "Appointment Cancelled",
            message: "A patient has cancelled their appointment. Please check your appointment schedule.",
            type: "Appointment",
        });

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            appointment,
        });
    } catch(error) {
        console.error("Cancel appointment error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to cancel appointment",
        });
    }
}

// get doctor
export async function getDoctors(req, res){
    try {
        const doctors = await User.find({ role: "doctor" })
        .select("_id fullName email")
        .sort({ fullName: 1 });

        return res.status(200).json({
            success: true,
            doctors,
        });
    } catch(error) {
        console.error("Get doctors error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch doctors",
        });
    }
}

// for doctor appointment
export async function getDoctorAppointments(req, res) {
    try {
        const appointments = await Appointment.find({
            doctor: req.user.userId,
        })
        .populate("patient", "fullName email phone")
        .sort({ appointmentDate: 1 });

        return res.status(200).json({
            success: true,
            appointments,
        });

    } catch(error) {
        console.error("Get doctor appointments error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch doctor appointments.",
        });
    }
}

// update appointment status
export async function updateAppointmentStatus(req, res) {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        if(!mongoose.isValidObjectId(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID",
            });
        }

        if(!["confirmed", "rejected"].includes(status)){
            return res.status(400).json({
                success: false,
                message: "Status must be confirmed or rejected",
            });
        }

        const appointment = await Appointment.findOneAndUpdate(
            {
                _id: appointmentId,
                doctor: req.user.userId,
                status: "pending",
            },
            {
                $set: { status },
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        ).populate("patient", "fullName email phone");

        if(!appointment) {
            return res.status(404).json({
                success: false,
                message: "Pending appointment not found or you are not authorized to update it",
            });
        }

        await Notification.create({
            recipient: appointment.patient._id,
            title: status === "confirmed" ? "Appointment Confirmed" : "Appointment Rejected",
            message: status === "confirmed" ? "Your doctor has confirmed your appointment." : "Your doctor has rejected your appointment request.",
            type: "Appointment",
        });

        return res.status(200).json({
            success: true,
            message: `Appointment ${status} successfully.`,
            appointment,
        });

    } catch(error) {
        console.error("Update Appointment status error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to update appointment status.",
        });
    }
}

// doctor statistics
export async function getDoctorStats(req, res){
    try {
        const doctorId = req.user.userId;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);

        const [totalPatients, todayAppointments, pendingAppointments, completedAppointments] = await Promise.all([
            Appointment.distinct("patient", {doctor: doctorId}),
            Appointment.countDocuments({doctor: doctorId, appointmentDate: {$gte: today, $lt: tomorrow}}),
            Appointment.countDocuments({doctor: doctorId, status: "pending"}),
            Appointment.countDocuments({doctor: doctorId, status: "completed"})
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                totalPatients: totalPatients.length,
                todayAppointments,
                pendingAppointments,
                completedAppointments
            }
        });

    } catch(error) {
        console.error("Doctor stats error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch doctor statistics.",
        });
    }
}

// get patient list
export async function getMyPatients(req, res) {
    try {
        const patientIds = await Appointment.distinct("patient", {doctor: req.user.userId});

        const patients = await User.find({
            _id: {$in: patientIds},
            role: "patient",
        })
        .select("fullName email phone gender dob")
        .sort({ fullName: 1 });

        return res.status(200).json({
            success: true,
            patients,
        });

    } catch(error) {
        console.error("Get My Patient Error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch Patients",
        });
    }
}