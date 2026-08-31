import Timeline from "../models/Timeline.js";

export const getTimeline = async (req, res) => {
  try {
    const items = await Timeline.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch timeline.", error: err.message });
  }
};

export const addTimelineItem = async (req, res) => {
  try {
    const { title, description, period, icon, order } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }
    const item = await Timeline.create({
      title,
      description: description || "",
      period: period || "",
      icon: icon || "",
      order: order ?? 0,
    });
    res.status(201).json({ message: "Timeline item added.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to add timeline item.", error: err.message });
  }
};

export const updateTimelineItem = async (req, res) => {
  try {
    const { title, description, period, icon, order } = req.body;
    const item = await Timeline.findByIdAndUpdate(
      req.params.id,
      { title, description, period, icon, order },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Timeline item not found." });
    res.status(200).json({ message: "Timeline item updated.", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update timeline item.", error: err.message });
  }
};

export const deleteTimelineItem = async (req, res) => {
  try {
    const deleted = await Timeline.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Timeline item not found." });
    res.status(200).json({ message: "Timeline item deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete timeline item.", error: err.message });
  }
};