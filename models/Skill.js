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
    default: "#000000", // badge background color
  },
  textColor: {
    type: String,
    default: "#ffffff", // badge text color
  }
});

export default mongoose.model("Skill", skillSchema);
