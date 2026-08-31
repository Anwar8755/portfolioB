import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  period: {
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

export default mongoose.model("Timeline", timelineSchema);