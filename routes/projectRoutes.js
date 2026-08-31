import express from "express";
import {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",        getProjects);
router.get("/:id",      getProjectById);
router.post("/",       verifyToken, addProject);
router.put("/:id",     verifyToken, updateProject);
router.delete("/:id",  verifyToken, deleteProject);

export default router;