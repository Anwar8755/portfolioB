import express from "express";
import Prompt from "../models/Prompt.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ── GET — frontend + AI route use karega ── */
router.get("/", async (req, res) => {
  try {
    let prompt = await Prompt.findOne();

    if (!prompt) {
      prompt = await Prompt.create({
        content: `You are a professional AI assistant embedded in Anwar Ali's developer portfolio website.
Your ONLY purpose is to answer questions about Anwar Ali — his skills, projects, experience, and how to hire or contact him.

CONTACT:
- WhatsApp: +91 9310575134
- Email: anwarali812632@gmail.com
- GitHub: github.com/Anwar8755
- LinkedIn: linkedin.com/in/anwar-ali-516b861b7

STRICT RULES:
1. ONLY answer about Anwar Ali
2. For unrelated questions: "I'm Anwar's portfolio assistant — I can only answer questions about his skills, projects, and experience!"
3. For salary/rates: "Please contact Anwar on WhatsApp +91 9310575134"
4. Never make up information
5. Always end responses completely`,
      });
    }

    res.json({ content: prompt.content });
  } catch (err) {
    console.error("Prompt fetch error:", err);
    res.status(500).json({ error: "Could not fetch prompt." });
  }
});

/* ── PUT — Admin se update hoga ── */
router.put("/", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Prompt content is required." });
    }

    let prompt = await Prompt.findOne();

    if (prompt) {
      prompt.content   = content.trim();
      prompt.updatedAt = Date.now();
      await prompt.save();
    } else {
      prompt = await Prompt.create({ content: content.trim() });
    }

    res.json({ message: "Prompt updated successfully.", content: prompt.content });
  } catch (err) {
    console.error("Prompt update error:", err);
    res.status(500).json({ error: "Could not update prompt." });
  }
});

export default router;