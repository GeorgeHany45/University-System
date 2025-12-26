const express = require("express");
const router = express.Router();
const Questionnaire = require("../models/questionnaire");
const Course = require("../models/course");
const CourseEnrollment = require("../models/courseEnrollment");
const User = require("../models/users");

// Admin creates a questionnaire for a teacher
router.post("/create", async (req, res) => {
  const { teacherId, title, questions } = req.body;
  try {
    if (!teacherId || !title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const questionnaire = await Questionnaire.create({ teacherId, title, questions });
    res.status(201).json({ message: "Questionnaire created", questionnaire });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all questionnaires for a teacher (for students to answer)
router.get("/teacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const questionnaires = await Questionnaire.findAll({ where: { teacherId } });
    res.json({ questionnaires });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get questionnaires available for a student (only for teachers of enrolled courses)
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    // Find all courses the student is enrolled in
    const enrollments = await CourseEnrollment.findAll({ where: { userId: studentId } });
    const teacherIds = [];
    for (const enrollment of enrollments) {
      const course = await Course.findByPk(enrollment.courseId);
      if (course && course.instructorId && !teacherIds.includes(course.instructorId)) {
        teacherIds.push(course.instructorId);
      }
    }
    // Get all questionnaires for these teachers
    const questionnaires = await Questionnaire.findAll({ where: { teacherId: teacherIds } });
    res.json({ questionnaires });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// (Optional) Add endpoint for students to submit answers
// router.post("/answer", ...)

module.exports = router;
