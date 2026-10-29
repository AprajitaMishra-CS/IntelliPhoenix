import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
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

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        type: {
            type: String,
            enum: ["Appointment", "Prescription", "Reminder", "System", "Other", ],
            default: "System",
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true } 
);

export default mongoose.model("Notification", notificationSchema);