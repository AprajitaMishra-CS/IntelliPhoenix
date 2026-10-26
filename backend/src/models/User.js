import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Female", "Male", "Other", "Prefer not to say"],
            required: true,
            set: (value) => {
                if(typeof value !== "string") return value;

                const normalized = value.trim().toLowerCase();

                const genderMap = {
                    male: "Male",
                    female: "Female",
                    other: "Other",
                };

                return genderMap[normalized] || value.trim();
            },
        },
        address: {
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
            country: {
                type: String,
                required: true,
                trim: true,
            },
        },
        role: {
            type: String,
            enum: ["patient", "doctor", "admin"],
            default: "patient",
            required: true,
        }, 
        password: {
            type: String,
            required: true,
            select: false,
        },
        acceptedTerms: {
            type: Boolean,
            required: true,
            validate: {
                validator: (value) => value === true,
                message: "You must accept the terms and privacy policy.",
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;