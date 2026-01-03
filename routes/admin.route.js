import express from "express";
import {
  getQueueByDepartment,
  callNextPatient,
  markTokenDone,
} from "../controllers/admin.controller.js";

const router = express.Router();

/* =========================
   ADMIN ROUTES
========================= */
router.get("/queue/:department", getQueueByDepartment);
router.get("/call-next/:department", callNextPatient);
router.put("/done/:tokenId", markTokenDone);

export default router; // ✅ THIS LINE IS REQUIRED
