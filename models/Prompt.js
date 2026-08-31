import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Prompt", promptSchema);