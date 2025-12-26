const express = require("express");
const router = express.Router();
const Grade = require("../models/grade");
const User = require("../models/users");
const Course = require("../models/course");

const allowedGrades = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D", "F"
];

// Test route to verify routing works
router.get("/test", (req, res) => {
  res.json({ message: "Grades route is working!" });
});

// Get all students for grade upload (for dropdown) - MUST come before /student/:username
router.get("/students", async (req, res) => {
  try {
    console.log("GET /api/grades/students - Route hit!");
    const students = await User.findAll({
      where: { role: "student" },
      attributes: ["id", "username", "email"],
      order: [["username", "ASC"]],
    });

    console.log(`Found ${students.length} students`);
    res.json({ students });
  } catch (err) {
    console.error("GET STUDENTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Upload grade by username
router.post("/", async (req, res) => {
  try {
    console.log("UPLOAD GRADE - BODY:", req.body);
    const { studentUsername, courseId, grade } = req.body;

    if (!studentUsername || !courseId || !grade) {
      return res.status(400).json({ message: "Missing required fields: studentUsername, courseId, grade" });
    }

    if (!allowedGrades.includes(grade)) {
      return res.status(400).json({ message: "Invalid grade value. Allowed: " + allowedGrades.join(", ") });
    }

    // Find student by username
    const student = await User.findOne({ where: { username: studentUsername, role: "student" } });
    if (!student) {
      console.error("Student not found:", studentUsername);
      return res.status(404).json({ message: "Student not found with username: " + studentUsername });
    }

    // Check if course exists
    const course = await Course.findByPk(parseInt(courseId));
    if (!course) {
      console.error("Course not found:", courseId);
      return res.status(404).json({ message: "Course not found with ID: " + courseId });
    }

    // Check if grade already exists for this student and course
    const existingGrade = await Grade.findOne({
      where: {
        studentId: student.id,
        courseId: parseInt(courseId),
      },
    });

    if (existingGrade) {
      // Update existing grade
      existingGrade.grade = grade;
      existingGrade.studentUsername = studentUsername;
      await existingGrade.save();
      console.log("Grade updated:", existingGrade.id);
      return res.status(200).json({
        message: "Grade updated successfully",
        grade: existingGrade,
      });
    }

    // Create new grade
    const newGrade = await Grade.create({
      studentUsername,
      studentId: student.id,
      courseId: parseInt(courseId),
      grade,
    });

    console.log("Grade created successfully:", newGrade.id);

    res.status(201).json({
      message: "Grade uploaded successfully",
      grade: newGrade,
    });
  } catch (err) {
    console.error("UPLOAD GRADE ERROR:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      message: "Server error", 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Get grades by student username - MUST come after /students
router.get("/student/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Find student by username
    const student = await User.findOne({ where: { username, role: "student" } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const grades = await Grade.findAll({
      where: { studentId: student.id },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "code", "title", "department", "credits", "instructorName"],
        },
        {
          model: User,
          as: "student",
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(grades);
  } catch (err) {
    console.error("GET STUDENT GRADES ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
