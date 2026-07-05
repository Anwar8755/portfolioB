import Project from "../models/Project.js";

// Add Project
export const addProject = async (req, res) => {
  try {
    const { title, image, link, description, techStack } = req.body;

    if (!title || !image || !link) {
      return res.status(400).json({ message: "Title, image, and link are required" });
    }

    const newProject = new Project({ title, image, link, description, techStack });
    await newProject.save();

    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Failed to add project", error: error.message });
  }
};

// Get All Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deleted = await Project.findByIdAndDelete(projectId);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error: error.message });
  }
};
