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
  }
});

export default mongoose.model("Skill", skillSchema);
