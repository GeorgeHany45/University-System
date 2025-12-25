const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const User = require("../models/users");
const multer = require("multer");

// Get all assignments for a specific course
router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.findAll({
      where: { courseId },
      include: [
        { model: Course, attributes: ["id", "name"] },
        { model: User, attributes: ["id", "username"], as: "User" },
      ],
      order: [["dueDate", "ASC"]],
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all assignments for a student (from enrolled courses)
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const assignments = await Assignment.findAll({
      include: [
        {
          model: Course,
          attributes: ["id", "name"],
          where: {
            "$CourseEnrollments.UserId$": studentId,
          },
          include: [
            {
              model: require("../models/courseEnrollment"),
              attributes: [],
              where: { UserId: studentId },
            },
          ],
        },
        { model: User, attributes: ["id", "username"], as: "User" },
      ],
      order: [["dueDate", "ASC"]],
      raw: false,
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id, {
      include: [
        { model: Course, attributes: ["id", "name"] },
        { model: User, attributes: ["id", "username"], as: "User" },
      ],
    });
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new assignment (teacher only)
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate, courseId, teacherId } = req.body;
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      courseId,
      teacherId,
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update assignment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    await assignment.update({ title, description, dueDate });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete assignment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    await assignment.destroy();
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Temporary POST creating assignments
router.post("/", (req, res) => {
  const { courseId, title, deadline, description } = req.body;

  if (!courseId || !title || !deadline) {
    return res.status(400).json({ message: "Missing fields" });
  }

  res.status(201).json({
    message: "Assignment created successfully",
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File upload 
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(201).json({
    message: "Assignment uploaded successfully",
    file: req.file.filename,
  });
});





module.exports = router;
