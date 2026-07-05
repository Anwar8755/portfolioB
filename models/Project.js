import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  techStack: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
