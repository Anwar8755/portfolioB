import express from "express";
import { addSkill, getSkills, deleteSkill } from "../controllers/skillController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills); // public
router.post("/", verifyToken, addSkill); // protected
router.delete("/:id", verifyToken, deleteSkill); // protected

export default router;
