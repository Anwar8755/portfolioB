import express from "express";
import {
  getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
} from "../controllers/testimonialController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", verifyToken, addTestimonial);
router.put("/:id", verifyToken, updateTestimonial);
router.delete("/:id", verifyToken, deleteTestimonial);

export default router;