import { Token } from "../models/token.model.js";

/* =========================
   GET QUEUE BY DEPARTMENT
========================= */
export const getQueueByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    console.log("ADMIN QUEUE REQUEST FOR:", department);

    const queue = await Token.find({
      department,
      status: "waiting",
    }).populate("patient", "name");

    console.log("QUEUE FOUND:", queue);

    return res.json({
      success: true,
      queue,
    });
  } catch (error) {
    console.error("ADMIN QUEUE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load queue",
    });
  }
};

/* =========================
   CALL NEXT PATIENT
========================= */
export const callNextPatient = async (req, res) => {
  try {
    const { department } = req.params;

    const nextToken = await Token.findOneAndUpdate(
      { department, status: "waiting" },
      { status: "called" },
      { sort: { tokenNumber: 1 }, new: true }
    ).populate("patient", "name");

    if (!nextToken) {
      return res.status(404).json({
        success: false,
        message: "No waiting patients",
      });
    }

    res.json({ success: true, token: nextToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to call next patient",
    });
  }
};

/* =========================
   MARK TOKEN DONE
========================= */
export const markTokenDone = async (req, res) => {
  try {
    const { tokenId } = req.params;

    await Token.findByIdAndUpdate(tokenId, {
      status: "done",
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark done",
    });
  }
};
