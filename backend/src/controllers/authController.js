import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
    try {
        const { fullName, email, phone, dateOfBirth, gender, city, state, country, password, confirmPassword, acceptedTerms, } = req.body;

        if( !fullName || !email || !phone || !dateOfBirth || !gender || !city || !state || !country || !password || !confirmPassword || !acceptedTerms ){
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields.",
            });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password do not match."
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        if(acceptedTerms !== true){
            return res.status(400).json({
                success: false,
                message: "Please accept the terms and privacy policy.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            phone: phone.trim(),
            dob: dateOfBirth,
            gender,
            address: {
                city: city.trim(),
                state: state.trim(),
                country: country.trim(),
            },
            password: hashedPassword,
            acceptedTerms: true,
            role: "patient",
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });
    } catch(error){
        if(error.code === 11000){
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        console.error("Registration error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Registration failed. Please try again.",
        });
    }
}

export async function loginUser(req,res) {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        }).select("+password");

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role:user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });
    } catch(error) {
        console.error("Login error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
}