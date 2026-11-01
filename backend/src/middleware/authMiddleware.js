import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authMiddleware(req, res, next) {
    try{
        const authHeader = req.headers.authorization;

        // Check for the Bearer token
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Authentication token is required",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId)
        .select("_id role isActive");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User account not found.",
            });
        }

        if(user.isActive === false){
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Please contact the administrator.",
            });
        }

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token.",
        });
    }
}