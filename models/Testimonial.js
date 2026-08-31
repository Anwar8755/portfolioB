import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  quote: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);