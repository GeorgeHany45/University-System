import React, { useState } from "react";
import "./uploadgrades.css";

const UploadGrades = () => {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [grade, setGrade] = useState("");

  const gradeOptions = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, courseId, grade }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error uploading grade");
        return;
      }

      alert("Grade uploaded successfully ✅");

      setStudentId("");
      setCourseId("");
      setGrade("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="upload-grades-page">
      <div className="upload-grades-card">
        <h2>Upload Grades</h2>

        <form onSubmit={handleSubmit}>
          <label>Student ID</label>
          <input
            type="text"
            placeholder="Enter student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <label>Course ID</label>
          <input
            type="text"
            placeholder="Enter course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />

          <label>Grade</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          >
            <option value="">Select grade</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <button type="submit">Submit Grade</button>
        </form>
      </div>
    </div>
  );
};

export default UploadGrades;
