import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

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