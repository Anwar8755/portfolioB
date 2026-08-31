import express from "express";
import Analytics from "../models/Analytics.js";
import Visitor   from "../models/Visitor.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ── Track a page visit — public ── */
router.post("/track", async (req, res) => {
  try {
    const { page } = req.body;

    if (!page || typeof page !== "string") {
      return res.status(400).json({ error: "Page is required." });
    }

    /* update or create page analytics */
    await Analytics.findOneAndUpdate(
      { page: page.trim() },
      { $inc: { visits: 1 }, lastVisit: Date.now() },
      { upsert: true, new: true }
    );

    /* update total visitor count */
    let visitor = await Visitor.findOne();
    if (visitor) {
      visitor.totalVisits += 1;
      visitor.lastVisit    = Date.now();
      await visitor.save();
    } else {
      await Visitor.create({ totalVisits: 1 });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Analytics track error:", err);
    res.status(500).json({ error: "Could not track visit." });
  }
});

/* ── Get all analytics — admin only ── */
router.get("/", verifyToken, async (req, res) => {
  try {
    const pages   = await Analytics.find().sort({ visits: -1 });
    const visitor = await Visitor.findOne();

    res.json({
      totalVisits: visitor?.totalVisits || 0,
      lastVisit:   visitor?.lastVisit   || null,
      pages,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    res.status(500).json({ error: "Could not fetch analytics." });
  }
});

export default router;