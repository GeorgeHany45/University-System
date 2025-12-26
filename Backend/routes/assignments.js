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
        {
          model: Course,
          attributes: ["id", "code", "title", "department"],
          as: "Course",
        },
        {
          model: User,
          attributes: ["id", "username", "email"],
          as: "teacher",
        },
      ],
      order: [["dueDate", "ASC"]],
    });
    res.json(assignments);
  } catch (err) {
    console.error("GET COURSE ASSIGNMENTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all assignments for a student by username (from enrolled courses)
router.get("/student/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    // First, find the user by username
    const student = await User.findOne({ where: { username } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get all course enrollments for this student
    const CourseEnrollment = require("../models/courseEnrollment");
    const enrollments = await CourseEnrollment.findAll({
      where: { userId: student.id },
    });

    const courseIds = enrollments.map(e => e.courseId);

    if (courseIds.length === 0) {
      return res.json([]);
    }

    // Get all assignments for enrolled courses
    const assignments = await Assignment.findAll({
      where: {
        courseId: courseIds,
      },
      include: [
        {
          model: Course,
          attributes: ["id", "code", "title", "department"],
          as: "Course",
        },
        {
          model: User,
          attributes: ["id", "username", "email"],
          as: "teacher",
        },
      ],
      order: [["dueDate", "ASC"]],
    });

    res.json(assignments);
  } catch (err) {
    console.error("GET STUDENT ASSIGNMENTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get single assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id, {
      include: [
        {
          model: Course,
          attributes: ["id", "code", "title", "department"],
          as: "Course",
        },
        {
          model: User,
          attributes: ["id", "username", "email"],
          as: "teacher",
        },
      ],
    });
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.json(assignment);
  } catch (err) {
    console.error("GET ASSIGNMENT ERROR:", err);
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

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("UPLOAD ASSIGNMENT - BODY:", req.body);
    console.log("UPLOAD ASSIGNMENT - FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { courseId, title, deadline, description } = req.body;
    const teacherId = req.body.teacherId || null;

    if (!courseId || !title || !deadline) {
      return res.status(400).json({ message: "Missing required fields: courseId, title, deadline" });
    }

    // Parse deadline date - handle both date and datetime-local formats
    let dueDate;
    try {
      dueDate = new Date(deadline);
      if (isNaN(dueDate.getTime())) {
        return res.status(400).json({ message: "Invalid deadline date format" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid deadline date format" });
    }

    // Verify course exists
    const course = await Course.findByPk(parseInt(courseId));
    if (!course) {
      return res.status(404).json({ message: "Course not found with ID: " + courseId });
    }

    // Create assignment in database
    const assignment = await Assignment.create({
      title,
      description: description || "",
      dueDate: dueDate,
      courseId: parseInt(courseId),
      teacherId: teacherId ? parseInt(teacherId) : null,
      filePath: req.file.path,
      fileName: req.file.originalname,
    });

    console.log("Assignment created successfully:", assignment.id);

    res.status(201).json({
      message: "Assignment uploaded successfully",
      assignment,
      file: req.file.filename,
    });
  } catch (err) {
    console.error("UPLOAD ASSIGNMENT ERROR:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      message: "Server error", 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});





module.exports = router;
