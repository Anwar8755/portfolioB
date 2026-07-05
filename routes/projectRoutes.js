import express from "express";
import { addProject, getProjects, deleteProject } from "../controllers/projectController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects); // public
router.post("/", verifyToken, addProject); // protected
router.delete("/:id", verifyToken, deleteProject); // protected

export default router;
