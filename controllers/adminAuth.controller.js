import { User } from "../models/user.model.js";

/* =========================
   CREATE ADMIN (ONE TIME)
========================= */
export const createAdmin = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone required",
      });
    }

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await User.create({
      name,
      phone,
      role: "ADMIN",
    });

    res.status(201).json({
      success: true,
      message: "Admin created",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================
   ADMIN LOGIN
========================= */
export const adminLogin = async (req, res) => {
  try {
    const { phone } = req.body;

    const admin = await User.findOne({ phone, role: "ADMIN" });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Not authorized as admin",
      });
    }

    res.json({
      success: true,
      message: "Admin login successful",
      user: {
        _id: admin._id,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
