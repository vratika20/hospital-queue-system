import express from "express";
import { registerPatient } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerPatient);

export default router;

