import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#000000",
  },
  textColor: {
    type: String,
    default: "#ffffff",
  },
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Database", "Tools"],
    default: "Frontend",
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Intermediate",
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
  description: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Skill", skillSchema);