import Project from "../models/Project.js";

// Add Project
export const addProject = async (req, res) => {
  try {
    const {
      title,
      images,
      link,
      github,
      description,
      longDescription,
      techStack,
      keyFeatures,
      challenges,
      category,
      role,
      duration,
      featured,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const newProject = new Project({
      title,
      images:          images          || [],
      link:            link            || "",
      github:          github          || "",
      description,
      longDescription: longDescription || "",
      techStack:       techStack       || [],
      keyFeatures:     keyFeatures     || [],
      challenges:      challenges      || [],
      category:        category        || "",
      role:            role            || "",
      duration:        duration        || "",
      featured:        featured        ?? false,
    });

    await newProject.save();

    res.status(201).json({ message: "Project added successfully.", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Failed to add project.", error: error.message });
  }
};

// Get All Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects.", error: error.message });
  }
};

// Get Single Project (for detail page)
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project.", error: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const {
      title,
      images,
      link,
      github,
      description,
      longDescription,
      techStack,
      keyFeatures,
      challenges,
      category,
      role,
      duration,
      featured,
    } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        images,
        link,
        github,
        description,
        longDescription,
        techStack,
        keyFeatures,
        challenges,
        category,
        role,
        duration,
        featured,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project updated successfully.", project: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update project.", error: error.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project.", error: error.message });
  }
};