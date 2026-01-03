import { User } from "../models/user.model.js";

/* =========================
   PATIENT REGISTER
========================= */
export const registerPatient = async (req, res) => {
  try {
    const { name, age, phone } = req.body;

    // 1️⃣ Validation
    if (!name || !phone || age === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing patient
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Patient already registered",
      });
    }

    // 3️⃣ Create patient
    const user = await User.create({
      name,
      age,
      phone,
    });

    // 4️⃣ Response
    return res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      user,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
