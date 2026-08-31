import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  isAvailable: { type: Boolean, default: true },
  message:     { type: String,  default: "Open to work" },
  updatedAt:   { type: Date,    default: Date.now },
});

export default mongoose.model("Availability", availabilitySchema);