import mongoose from "mongoose";
import Prescription from "../models/Prescription.js";
import User from "../models/User.js";

// Doctor creates a prescription for a patient
export async function createPrescription(req, res) {
    try {
        const { patientId, diagnosis, medicines, notes } = req.body;

        if(!mongoose.Types.ObjectId.isValid(patientId)){
            return res.status(400).json({
                success: false,
                message: "A valid patient ID is required.",
            });
        }

        if(!Array.isArray(medicines) || medicines.length === 0 || medicines.some(
            (medicine) => !medicine.medicineName?.trim() || !medicine.dosage?.trim() || !medicine.frequency?.trim() ||!medicine.duration?.trim()
        )) {
            return res.status(400).json({
                success: false,
                message: "Provide at atleast one medicine with its name, dosage, frequency, and duration.",
            });
        }

        const patient = await User.findOne({
            _id: patientId,
            role: "patient",
        }).select("_id");

        if(!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        const prescription = await Prescription.create({
            patient: patient._id,
            doctor: req.user.userId,
            diagnosis,
            medicines,
            notes,
        });

        return res.status(201).json({
            success: true,
            message: "Prescription created successfully",
            prescription,
        });

    } catch(error) {
        console.error("Create Prescription error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not create prescription.",
        });
    }
}

export async function getMyPrescription(req, res) {
    try {
        const prescriptions = await Prescription.find({
            patient: req.user.userId,
        })
        .populate("doctor", "fullName")
        .sort({ issuedAt: -1 })
        .lean();

        return res.status(200).json({
            success: true,
            prescriptions,
        });
    } catch(error) {
        console.error("Get prescription error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not load prescriptions.",
        });
    }
}

export async function getMyIssuedPrescriptions(req, res) {
    try {
        const prescriptions = await Prescription.find({
            doctor: req.user.userId,
        })
        .populate("patient", "fullName email")
        .sort({ issuedAt: -1 })
        .lean();

        return res.status(200).json({
            success: true,
            prescriptions,
        });
    } catch(error) {
        console.error("Get issued prescriptions error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not load issued prescriptions.",
        });
    }
}