import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/User.js";

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
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
            },
            password: hashedPassword,
            acceptedTerms: true,
            role: "doctor",
        });

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