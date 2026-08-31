import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch testimonials.", error: err.message });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const { name, role, company, photo, quote, rating, featured } = req.body;
    if (!name || !quote) {
      return res.status(400).json({ message: "Name and quote are required." });
    }
    const item = await Testimonial.create({
      name,
      role: role || "",
      company: company || "",
      photo: photo || "",
      quote,
      rating: rating ?? 5,
      featured: featured ?? false,
    });
    res.status(201).json({ message: "Testimonial added.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to add testimonial.", error: err.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { name, role, company, photo, quote, rating, featured } = req.body;
    const item = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, company, photo, quote, rating, featured },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Testimonial not found." });
    res.status(200).json({ message: "Testimonial updated.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update testimonial.", error: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Testimonial not found." });
    res.status(200).json({ message: "Testimonial deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete testimonial.", error: err.message });
  }
};