import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// route imports
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js"; 
import aiRoute from "./routes/ai.js";
import promptRoutes from "./routes/promptRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import whyWorkWithMeRoutes from "./routes/whyWorkWithMeRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";

// env config
dotenv.config();

// express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// static uploads access
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// connect to DB
connectDB();

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoute);
app.use("/api/prompt", promptRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/why-work-with-me", whyWorkWithMeRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/education", educationRoutes);
// base route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running...");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
