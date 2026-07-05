import express from "express";
import upload from "../middlewares/upload.js";
import { uploadResume, getResume, deleteResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", upload.single("resume"), uploadResume);
router.get("/", getResume);
router.delete("/", deleteResume);

export default router; // ✅ ES Module export
