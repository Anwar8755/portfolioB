import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  totalVisits: { type: Number, default: 0 },
  lastVisit:   { type: Date,   default: Date.now },
});

export default mongoose.model("Visitor", visitorSchema);