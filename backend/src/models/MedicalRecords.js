import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        recordType: {
            type: String,
            enum: ["Lab Report", "Prescription", "Diagnosis", "Discharge Summary", "Other", ],
            default: "Other",
        },

        doctorName: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "",
        },

        recordDate: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        fileUrl: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.model("MedicalRecord", medicalRecordSchema);