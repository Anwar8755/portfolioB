import express from "express";
import {
  addSkill,
  getSkills,
  deleteSkill,
  updateSkill,
} from "../controllers/skillController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",        getSkills);
router.post("/",       verifyToken, addSkill);
router.put("/:id",     verifyToken, updateSkill);
router.delete("/:id",  verifyToken, deleteSkill);

export default router;