import mongoose from "mongoose";
import Notification from "../models/Notification.js";

export async function getMyNotification(req, res) {
    try {
        const filter = {
            recipient: new mongoose.Types.ObjectId(req.user.userId),
        };

        const notifications = await Notification.find(filter)
        .sort({ createdAt: -1 })
        .lean();

        return res.status(200).json({
            success: true,
            notifications,
            unreadCount: notifications.filter(
                (notification) => !notification.isRead
            ).length,
        });

    } catch(error) {
        console.error("Get notification error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not load notifications",
        });
    }
}

export async function markNotificationAsRead(req, res) {
    try {
        const { notificationId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(notificationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid notification ID.",
            });
        }

        const notification = await Notification.findOneAndUpdate(
            {
                _id: notificationId,
                recipient: req.user.userId,
            },
            { $set: {isRead: true} },
            { new: true, runValidators: true }
        );

        if(!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            notification,
        });

    } catch(error) {
        console.error("Mark notification as read error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not update notification.",
        });
    } 
}