import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  page:      { type: String, required: true },
  visits:    { type: Number, default: 0 },
  lastVisit: { type: Date,   default: Date.now },
});

export default mongoose.model("Analytics", analyticsSchema);