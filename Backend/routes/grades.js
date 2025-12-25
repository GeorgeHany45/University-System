const express = require("express");
const router = express.Router();
const Grade = require("../models/grade");

router.post("/", async (req, res) => {
  try {
    const { studentId, courseId, grade } = req.body;

    if (!studentId || !courseId || grade === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newGrade = await Grade.create({
      studentId,
      courseId,
      grade,
    });

    res.status(201).json({
      message: "Grade uploaded successfully",
      grade: newGrade,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const allowedGrades = [
    "A+", "A", "A-",
    "B+", "B", "B-",
    "C+", "C", "C-",
    "D+", "D", "F"
  ];
  
  router.post("/", async (req, res) => {
    try {
      const { studentId, courseId, grade } = req.body;
  
      if (!allowedGrades.includes(grade)) {
        return res.status(400).json({ message: "Invalid grade value" });
      }
  
      const newGrade = await Grade.create({
        studentId,
        courseId,
        grade,
      });
  
      res.status(201).json({
        message: "Grade uploaded successfully",
        grade: newGrade,
      });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
