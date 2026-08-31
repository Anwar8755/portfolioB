import Skill from "../models/Skill.js";

export const addSkill = async (req, res) => {
  try {
    const {
      name, icon, color, textColor,
      category, level, percentage, description, featured,
    } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: "Name and icon are required." });
    }

    const skill = new Skill({
      name,
      icon,
      color:       color       || "#000000",
      textColor:   textColor   || "#ffffff",
      category:    category    || "Frontend",
      level:       level       || "Intermediate",
      percentage:  percentage  ?? 50,
      description: description || "",
      featured:    featured    ?? false,
    });

    await skill.save();
    res.status(201).json({ message: "Skill added successfully.", skill });
  } catch (err) {
    res.status(500).json({ message: "Failed to add skill.", error: err.message });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch skills.", error: err.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const {
      name, icon, color, textColor,
      category, level, percentage, description, featured,
    } = req.body;

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name, icon, color, textColor,
        category, level, percentage, description, featured,
      },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json({ message: "Skill updated successfully.", skill });
  } catch (err) {
    res.status(500).json({ message: "Failed to update skill.", error: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Skill not found." });
    }
    res.status(200).json({ message: "Skill deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete skill.", error: err.message });
  }
};