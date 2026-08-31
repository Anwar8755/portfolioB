import Education from "../models/Education.js";

export const getEducation = async (req, res) => {
  try {
    const items = await Education.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch education.", error: err.message });
  }
};

export const addEducation = async (req, res) => {
  try {
    const {
      degreeOrCourseName, areaOfStudy, type, institution, location,
      startYear, endYear, ongoing, percentageOrGrade, description,
      certificateUrl, featured, order,
    } = req.body;

    if (!degreeOrCourseName || !institution) {
      return res.status(400).json({ message: "Course name and institution are required." });
    }

    const item = await Education.create({
      degreeOrCourseName,
      areaOfStudy:       areaOfStudy || "",
      type:               type || "Certificate",
      institution,
      location:           location || "",
      startYear:          startYear || "",
      endYear:            endYear || "",
      ongoing:            ongoing ?? false,
      percentageOrGrade:  percentageOrGrade || "",
      description:        description || "",
      certificateUrl:     certificateUrl || "",
      featured:           featured ?? false,
      order:              order ?? 0,
    });

    res.status(201).json({ message: "Education added.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to add education.", error: err.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const {
      degreeOrCourseName, areaOfStudy, type, institution, location,
      startYear, endYear, ongoing, percentageOrGrade, description,
      certificateUrl, featured, order,
    } = req.body;

    const item = await Education.findByIdAndUpdate(
      req.params.id,
      {
        degreeOrCourseName, areaOfStudy, type, institution, location,
        startYear, endYear, ongoing, percentageOrGrade, description,
        certificateUrl, featured, order,
      },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ message: "Education entry not found." });
    res.status(200).json({ message: "Education updated.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update education.", error: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Education entry not found." });
    res.status(200).json({ message: "Education deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete education.", error: err.message });
  }
};