import { Token } from "../models/token.model.js";

export const generateToken = async (req, res) => {
  try {
    let { patientId, department } = req.body;

    if (!patientId || !department) {
      return res.status(400).json({
        success: false,
        message: "Patient ID and department are required",
      });
    }

    department = department.trim();

    const lastToken = await Token.findOne({ department }).sort({
      tokenNumber: -1,
    });

    const nextTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    const token = await Token.create({
      patient: patientId,
      department,
      tokenNumber: nextTokenNumber,
      status: "waiting", // ✅ VERY IMPORTANT
    });

    return res.status(201).json({
      success: true,
      message: "Token generated successfully",
      token,
    });
  } catch (error) {
    console.error("Token error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
