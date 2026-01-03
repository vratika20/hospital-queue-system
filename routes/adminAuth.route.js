import express from "express";
import {
  createAdmin,
  adminLogin,
} from "../controllers/adminAuth.controller.js";

const router = express.Router();

// ONE-TIME: create admin (you use Postman)
router.post("/create-admin", createAdmin);

// DAILY: admin login
router.post("/login", adminLogin);

export default router;
