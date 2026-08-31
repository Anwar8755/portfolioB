import express from "express";
import {
  getTimeline, addTimelineItem, updateTimelineItem, deleteTimelineItem,
} from "../controllers/timelineController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getTimeline);
router.post("/", verifyToken, addTimelineItem);
router.put("/:id", verifyToken, updateTimelineItem);
router.delete("/:id", verifyToken, deleteTimelineItem);

export default router;