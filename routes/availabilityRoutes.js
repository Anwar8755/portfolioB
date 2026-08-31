import express from "express";
import Availability from "../models/Availability.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let status = await Availability.findOne();

    if (!status) {
      status = await Availability.create({
        isAvailable: true,
        message: "Open to work",
      });
    }

    res.json(status);
  } catch (err) {
    console.error("Availability fetch error:", err);
    res.status(500).json({ error: "Could not fetch availability." });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const { isAvailable, message } = req.body;

    let status = await Availability.findOne();

    if (status) {
      if (typeof isAvailable === "boolean") status.isAvailable = isAvailable;
      if (message) status.message = message.trim();
      status.updatedAt = Date.now();
      await status.save();
    } else {
      status = await Availability.create({
        isAvailable: isAvailable ?? true,
        message: message || "Open to work",
      });
    }

    res.json(status);
  } catch (err) {
    console.error("Availability update error:", err);
    res.status(500).json({ error: "Could not update availability." });
  }
});

export default router;