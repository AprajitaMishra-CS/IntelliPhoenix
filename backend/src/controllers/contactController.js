import ContactMessage from "../models/ContactMessage.js";

// submit contact message
export const createContactMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if(!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const contactMessage = await ContactMessage.create({ name, email, phone, subject, message });

        return res.status(201).json({
            success: true,
            message: "Your message has been submitted successfully.",
            data: contactMessage,
        });

    } catch(error) {
        console.error("Contact Message error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to submit your message.",
        });
    }
}

// get all contact message (admin only)
export const getAllContactMessage = async (req, res) => {
    try {
        const messages = await ContactMessage.find()
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: messages.length,
            data: messages,
        });

    } catch(error) {
        console.error("Fetch Contact messages error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch contact messsages.",
        });
    }
}

// message status mark as read (admin only)
export const updateContactMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if(!["Pending", "Resolved"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid message status.",
            });
        }

        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if(!message) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Message status updated successfully.",
            data: message,
        });

    } catch(error) {
        console.error("Update Contact Message Status error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to update message status.",
        });
    }
}