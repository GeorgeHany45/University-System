const express = require("express");
const router = express.Router();
const CourseEnrollment = require("../models/courseEnrollment");
const User = require("../models/users");
const Course = require("../models/course");

// Enroll a student in a course
router.post("/enroll", async (req, res) => {
  const { userId, courseId, courseCode, courseTitle, department, credits, instructor, semester, courseData } = req.body;

  try {
    // Check if already enrolled
    const existing = await CourseEnrollment.findOne({
      where: { userId, courseId },
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await CourseEnrollment.create({
      userId,
      courseId,
      courseCode,
      courseTitle,
      department,
      credits,
      instructor,
      semester,
      courseData,
    });

    res.status(201).json({
      message: "Successfully enrolled in course",
      enrollment,
    });
  } catch (err) {
    console.error("ENROLL ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all courses for a student
router.get("/student/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await CourseEnrollment.findAll({
      where: { userId },
    });

    res.status(200).json({
      courses: enrollments,
      total: enrollments.length,
    });
  } catch (err) {
    console.error("GET COURSES ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new course (admin)
router.post('/create', async (req, res) => {
  try {
    const {
      catalogId,
      department,
      code,
      title,
      description,
      credits,
      type,
      instructorId,
      instructorName,
      email,
      capacity,
      prerequisites,
      semester,
      schedule,
      lmsLink,
      extraData,
    } = req.body;

    const course = await Course.create({
      catalogId,
      department,
      code,
      title,
      description,
      credits,
      type,
      instructorId,
      instructorName,
      email,
      capacity,
      prerequisites,
      semester,
      schedule,
      lmsLink,
      extraData,
    });

    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    console.error('CREATE COURSE ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all courses (for listing)
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ courses });
  } catch (err) {
    console.error('GET ALL COURSES ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Remove a course enrollment
router.delete("/unenroll/:enrollmentId", async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    const enrollment = await CourseEnrollment.findByPk(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.destroy();

    res.status(200).json({ message: "Successfully dropped course" });
  } catch (err) {
    console.error("UNENROLL ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// CREATE COURSE
router.post("/", (req, res) => {
  const { name, code, description, teacherId } = req.body;

  if (!name || !code || !teacherId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

});


module.exports = router;
