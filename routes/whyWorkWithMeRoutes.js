import express from "express";
import {
  getWhyItems, addWhyItem, updateWhyItem, deleteWhyItem,
} from "../controllers/whyWorkWithMeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getWhyItems);
router.post("/", verifyToken, addWhyItem);
router.put("/:id", verifyToken, updateWhyItem);
router.delete("/:id", verifyToken, deleteWhyItem);

export default router;