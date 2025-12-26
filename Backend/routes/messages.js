const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Message = require("../models/message");
const User = require("../models/users");

// Send a message (student to staff or vice versa)
router.post("/send", async (req, res) => {
  try {
    const {
      senderId,
      receiverId,
      subject,
      content,
      messageType,
      meetingDate,
      courseId,
    } = req.body;

    if (!senderId || !receiverId || !content) {
      return res
        .status(400)
        .json({ message: "Missing required fields: senderId, receiverId, content" });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      subject,
      content,
      messageType: messageType || "general",
      meetingDate: meetingDate || null,
      meetingStatus: meetingDate ? "pending" : null,
      courseId: courseId || null,
    });

    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all messages for a user (inbox)
router.get("/inbox/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.findAll({
      where: { receiverId: userId },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "username", "email", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.error("GET INBOX ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all sent messages for a user
router.get("/sent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.findAll({
      where: { senderId: userId },
      include: [
        {
          model: User,
          as: "receiver",
          attributes: ["id", "username", "email", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.error("GET SENT MESSAGES ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get conversation between two users
router.get("/conversation/:userId1/:userId2", async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 },
        ],
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id", "username", "email", "role"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.error("GET CONVERSATION ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Mark message as read
router.put("/read/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({ message: "Message marked as read", data: message });
  } catch (err) {
    console.error("MARK READ ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update meeting request status (approve/reject)
router.put("/meeting/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { status } = req.body; // "approved", "rejected", "completed"

    if (!["approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.meetingStatus = status;
    await message.save();

    res.status(200).json({ message: "Meeting status updated", data: message });
  } catch (err) {
    console.error("UPDATE MEETING STATUS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all staff members (for students to select)
router.get("/staff", async (req, res) => {
  try {
    const staff = await User.findAll({
      where: {
        role: ["teacher", "admin"],
      },
      attributes: ["id", "username", "email", "role"],
    });

    res.status(200).json({ staff });
  } catch (err) {
    console.error("GET STAFF ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all students (for staff to select)
router.get("/students", async (req, res) => {
  try {
    const students = await User.findAll({
      where: {
        role: "student",
      },
      attributes: ["id", "username", "email", "role"],
    });

    res.status(200).json({ students });
  } catch (err) {
    console.error("GET STUDENTS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

