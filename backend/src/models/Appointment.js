import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        appointmentDate: {
            type: Date,
            required: true,
        },

        reason: {
            type: String,
            trim: true,
            required: true,
            maxlength: 500,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
        },
    },
    { timestamps: true}
);

// prevent the same doctor from having two active appointment at the exact same date and time
appointmentSchema.index(
    {doctor: 1, appointmentDate: 1},
    {
        unique: true,
        partialFilterExpression: {
            status: {$in: ["pending", "confirmed"]},
        },
    },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;