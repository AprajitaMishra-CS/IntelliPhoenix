import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
    {
        medicineName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        dosage: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        frequency: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        duration: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        instructions: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
    },
    { _id: false }
);

const prescriptionSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        diagnosis: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        medicines: {
            type: [medicineSchema],
            required: true,
            validate: {
                validator: (medicines) => Array.isArray(medicines) && medicines.length > 0,
                message: "At least one medicine is required.",
            },
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        issuedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);