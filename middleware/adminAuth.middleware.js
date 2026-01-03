import { User } from "../models/user.model.js";

export const adminAuth = async (req, res, next) => {
  try {
    // adminId should come from headers or body
    const adminId = req.headers["admin-id"];

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Admin ID missing",
      });
    }

    const admin = await User.findById(adminId);

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    req.admin = admin; // attach admin info
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin authentication failed",
    });
  }
};
