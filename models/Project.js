import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  link: {
    type: String,
  },
  github: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    default: "",
  },
  techStack: {
    type: [String],
    default: [],
  },
  keyFeatures: {
    type: [String],
    default: [],
  },
  challenges: {
    type: [
      {
        problem:  { type: String, required: true },
        solution: { type: String, required: true },
      },
    ],
    default: [],
  },
  category: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);