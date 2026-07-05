import express from "express";
import {
  submitMessage,
  getAllMessages,
  deleteMessage
} from "../controllers/contactController.js";

const router = express.Router();

// contact form submit
router.post("/", submitMessage);

// admin: get all messages
router.get("/", getAllMessages);

// optional: delete message
router.delete("/:id", deleteMessage);

export default router;
