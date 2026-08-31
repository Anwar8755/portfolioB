import mongoose from "mongoose";

const whySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("WhyWorkWithMe", whySchema);