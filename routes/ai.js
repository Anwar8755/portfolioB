import express from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import Prompt from "../models/Prompt.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please wait a minute." },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ── Skip karne wali collections ── */
const SKIP_COLLECTIONS = ["admins", "sessions", "prompts", "tokens"];

/* ── Saari collections se data fetch karo ── */
const fetchAllPortfolioData = async () => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    let allData = "\n\n=== LIVE DATABASE DATA ===\n";
    allData += "(This is Anwar's latest data directly from database)\n";

    for (const col of collections) {
      if (SKIP_COLLECTIONS.includes(col.name.toLowerCase())) continue;

      try {
        const items = await db.collection(col.name).find({}).toArray();
        if (items.length === 0) continue;

        allData += `\n--- ${col.name.toUpperCase()} (${items.length} total) ---\n`;

        items.forEach((item, i) => {
          const { _id, __v, password, token, ...clean } = item;
          allData += `${i + 1}. ${JSON.stringify(clean)}\n`;
        });

      } catch {
        continue;
      }
    }

    return allData;

  } catch (err) {
    console.error("DB fetch error:", err);
    return "";
  }
};

router.post("/chat", limiter, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const trimmed = message.trim();

    if (trimmed.length === 0) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }

    if (trimmed.length > 500) {
      return res.status(400).json({ error: "Message too long." });
    }

    /* ── 1. Base prompt DB se ── */
    let basePrompt = "";
    try {
      const promptDoc = await Prompt.findOne();
      basePrompt = promptDoc?.content || "You are Anwar Ali's portfolio assistant.";
    } catch {
      basePrompt = "You are Anwar Ali's portfolio assistant.";
    }

    /* ── 2. Saari collections ka data ── */
    const liveData = await fetchAllPortfolioData();

    /* ── 3. Final prompt ── */
    const finalPrompt = `${basePrompt}

${liveData}

IMPORTANT INSTRUCTIONS:
- You have access to ALL of Anwar's latest data from the database above
- This includes projects, skills, and ANY other data Anwar has added
- Always use this live data when answering questions
- If someone asks about any project, skill, or anything listed above — answer with full details
- Password, token fields are hidden for security — never mention them
- If new data is added to the database, you will automatically know about it`;

    /* ── 4. Gemini ── */
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const safeHistory = Array.isArray(history) ? history.slice(-6) : [];

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.8,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I have access to all of Anwar's latest data from the database. What would you like to know?" }],
        },
        ...safeHistory,
      ],
    });

    const result = await chat.sendMessage(trimmed);
    const reply  = result.response.text();

    const cleanReply = reply
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/#{1,6}\s/g, "")
      .trim();

    return res.status(200).json({ reply: cleanReply });

  } catch (err) {
    console.error("AI Error:", err?.message || err);

    if (err?.message?.includes("429")) {
      return res.status(429).json({ error: "AI is busy. Please try again." });
    }

    return res.status(500).json({ error: "AI assistant is unavailable right now." });
  }
});

export default router;