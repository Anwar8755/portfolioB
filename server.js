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

// base route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running...");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
