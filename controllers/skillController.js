import Skill from "../models/Skill.js";

// Add Skill
export const addSkill = async (req, res) => {
  try {
    const { name, icon, color, textColor } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: "Name and icon are required" });
    }

    const newSkill = new Skill({
      name,
      icon,
      color: color || "#000000",       // fallback to black
      textColor: textColor || "#ffffff" // fallback to white
    });

    await newSkill.save();

    res.status(201).json({ message: "Skill added successfully", skill: newSkill });
  } catch (error) {
    res.status(500).json({ message: "Failed to add skill", error: error.message });
  }
};

// Get All Skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills", error: error.message });
  }
};

// Delete Skill
export const deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const deleted = await Skill.findByIdAndDelete(skillId);
    if (!deleted) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill", error: error.message });
  }
};
