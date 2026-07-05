import Message from "../models/Message.js";

// POST: Submit contact form
export const submitMessage = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    const newMessage = new Message({ name, phone, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: "Message received successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit message" });
  }
};

// GET: Get all contact messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// DELETE: Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
