import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", verifyToken, updateAbout);

export default router;