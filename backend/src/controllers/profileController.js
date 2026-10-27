import User from "../models/User.js";

// View the logged-in user's profile
export async function getMyProfile(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch profile.",
    });
  }
}

// Edit the logged-in user's profile
export async function updateMyProfile(req, res) {
  try {
    const allowedFields = [ "fullName", "phone", "dob", "gender", "address", ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.fullName !== undefined && !updates.fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name cannot be empty.",
      });
    }

    if (updates.phone !== undefined && !updates.phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number cannot be empty.",
      });
    }

    // Only allow updates to the address fields defined in User.js
    if (updates.address !== undefined) {
      const { city, state, country } = updates.address || {};

      updates.address = {
        city: city ?? "",
        state: state ?? "",
        country: country ?? "",
      };
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
    
  } catch (error) {
    console.error("Update profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
}