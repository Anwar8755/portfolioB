import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  tagline: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);