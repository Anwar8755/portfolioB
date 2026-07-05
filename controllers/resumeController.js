import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";

export const uploadResume = async (req, res) => {
  try {
    const fileUrl = req.file.path; 
    const publicId = req.file.filename; 

    
    const oldResumes = await Resume.find();
    for (const doc of oldResumes) {
      if (doc.publicId) {
        await cloudinary.uploader.destroy(doc.publicId, { resource_type: "raw" });
      }
    }
    await Resume.deleteMany();

    const newResume = new Resume({ fileUrl, publicId });
    await newResume.save();

    res.status(201).json(newResume);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload resume" });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadedAt: -1 });
    if (!resume) return res.status(404).json({ message: "No resume found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ message: "No resume to delete" });

    if (resume.publicId) {
      await cloudinary.uploader.destroy(resume.publicId, { resource_type: "raw" });
    }

    await Resume.deleteMany();
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete resume" });
  }
};