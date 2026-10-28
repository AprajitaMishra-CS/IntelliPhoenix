import MedicalRecords from "../models/MedicalRecords.js";

export async function getMyMedicalRecords(req, res) {
    try {
        const records = await MedicalRecords.find({
            patient: req.user.userId,
        })
        .sort({ recordDate: -1 })
        .lean();

        return res.status(200).json({
            success: true,
            records,
        });
    } catch(error) {
        console.error("Get medical records error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not load medical records.",
        });
    }
}

export async function createMedicalRecord(req, res) {
    try {
        const {title, recordType, doctorName, recordDate, description, } = req.body;

        if(!title?.trim() || !recordDate){
            return res.status(400).json({
                success: false,
                message: "Title and record date are required.",
            });
        }

        const validTypes = ["Lab Report", "Prescription", "Diagnosis", "Discharge Summary", "Other",];

        if(!recordType && !validTypes.includes(recordType)){
            return res.status(400).json({
                success: false,
                message: "Invalid medical record type.",
            });
        }

        const parsedDate = new Date(recordDate);

        if(Number.isNaN(parsedDate.getTime())){
            return res.status(400).json({
                success: false,
                message: "Please provide a valid record date.",
            });
        }

        const record = await MedicalRecords.create({
            patient: req.user.userId,
            title: title.trim(),
            recordType: recordType || "Other",
            doctorName: doctorName || "",
            recordDate: parsedDate,
            description: description || "",
        });

        return res.status(201).json({
            success: true,
            message: "Medical record created successfully.",
            record,
        });
    } catch(error) {
        console.error("Create medical record error: ", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not create medical record.",
        });
    }
}