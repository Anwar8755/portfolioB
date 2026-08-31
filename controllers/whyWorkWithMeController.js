import WhyWorkWithMe from "../models/WhyWorkWithMe.js";

export const getWhyItems = async (req, res) => {
  try {
    const items = await WhyWorkWithMe.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items.", error: err.message });
  }
};

export const addWhyItem = async (req, res) => {
  try {
    const { title, description, icon, order } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }
    const item = await WhyWorkWithMe.create({
      title,
      description: description || "",
      icon: icon || "",
      order: order ?? 0,
    });
    res.status(201).json({ message: "Item added.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item.", error: err.message });
  }
};

export const updateWhyItem = async (req, res) => {
  try {
    const { title, description, icon, order } = req.body;
    const item = await WhyWorkWithMe.findByIdAndUpdate(
      req.params.id,
      { title, description, icon, order },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found." });
    res.status(200).json({ message: "Item updated.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update item.", error: err.message });
  }
};

export const deleteWhyItem = async (req, res) => {
  try {
    const deleted = await WhyWorkWithMe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found." });
    res.status(200).json({ message: "Item deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item.", error: err.message });
  }
};