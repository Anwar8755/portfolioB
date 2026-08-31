import express from "express";
import {
  getEducation, addEducation, updateEducation, deleteEducation,
} from "../controllers/educationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getEducation);
router.post("/", verifyToken, addEducation);
router.put("/:id", verifyToken, updateEducation);
router.delete("/:id", verifyToken, deleteEducation);

export default router;