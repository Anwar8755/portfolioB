import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degreeOrCourseName: {
    type: String,
    required: true,
  },
  areaOfStudy: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["Degree", "Diploma", "Certificate"],
    default: "Certificate",
  },
  institution: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  startYear: {
    type: String,
    default: "",
  },
  endYear: {
    type: String,
    default: "",
  },
  ongoing: {
    type: Boolean,
    default: false,
  },
  percentageOrGrade: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  certificateUrl: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Education", educationSchema);