const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");
const User = require("../models/users");

// Create a new announcement or event
router.post("/create", async (req, res) => {
  try {
    const {
      title,
      content,
      authorId,
      type,
      eventDate,
      eventLocation,
      targetAudience,
      priority,
    } = req.body;

    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: title, content, authorId" });
    }

    const announcement = await Announcement.create({
      title,
      content,
      authorId,
      type: type || "announcement",
      eventDate: eventDate || null,
      eventLocation: eventLocation || null,
      targetAudience: targetAudience || "all",
      priority: priority || "medium",
      isActive: true,
    });

    // Include author info in response
    const announcementWithAuthor = await Announcement.findByPk(announcement.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
      ],
    });

    res.status(201).json({
      message: "Announcement created successfully",
      data: announcementWithAuthor,
    });
  } catch (err) {
    console.error("CREATE ANNOUNCEMENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all active announcements/events
router.get("/all", async (req, res) => {
  try {
    const { type, targetAudience } = req.query;

    const where = { isActive: true };

    if (type) {
      where.type = type;
    }

    if (targetAudience) {
      where.targetAudience = targetAudience;
    }

    const announcements = await Announcement.findAll({
      where,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ announcements });
  } catch (err) {
    console.error("GET ALL ANNOUNCEMENTS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get announcements by type
router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const announcements = await Announcement.findAll({
      where: {
        type,
        isActive: true,
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ announcements });
  } catch (err) {
    console.error("GET ANNOUNCEMENTS BY TYPE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a single announcement by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
      ],
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ announcement });
  } catch (err) {
    console.error("GET ANNOUNCEMENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update an announcement
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await announcement.update(updateData);

    const updatedAnnouncement = await Announcement.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
      ],
    });

    res.status(200).json({
      message: "Announcement updated successfully",
      data: updatedAnnouncement,
    });
  } catch (err) {
    console.error("UPDATE ANNOUNCEMENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete (deactivate) an announcement
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // Soft delete by setting isActive to false
    announcement.isActive = false;
    await announcement.save();

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("DELETE ANNOUNCEMENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

