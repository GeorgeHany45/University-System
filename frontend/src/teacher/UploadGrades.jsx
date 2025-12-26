import React, { useState, useEffect } from "react";
import "./uploadgrades.css";

const UploadGrades = () => {
  const [studentUsername, setStudentUsername] = useState("");
  const [courseId, setCourseId] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    setLoading(true);
    setError("");

    // Fetch students list
    fetch("http://localhost:5001/api/grades/students")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch students: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Students data:", data);
        if (data.students && Array.isArray(data.students)) {
          setStudents(data.students);
          console.log(`Loaded ${data.students.length} students`);
        } else {
          console.warn("No students found or invalid data structure:", data);
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError(`Error loading students: ${err.message}`);
      });

    // Fetch courses list
    fetch("http://localhost:5001/api/courses/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch courses: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Courses data:", data);
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
          console.log(`Loaded ${data.courses.length} courses`);
        } else {
          console.warn("No courses found or invalid data structure:", data);
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError(`Error loading courses: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentUsername || !courseId || !grade) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentUsername, courseId, grade }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error uploading grade");
        return;
      }

      alert("Grade uploaded successfully ✅");

      setStudentUsername("");
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

        {loading && <p style={{ color: '#666', marginBottom: '20px' }}>Loading students and courses...</p>}
        {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
        
        {!loading && students.length === 0 && (
          <p style={{ color: 'orange', marginBottom: '20px' }}>
            ⚠️ No students found in the database. Please create student accounts first.
          </p>
        )}
        
        {!loading && courses.length === 0 && (
          <p style={{ color: 'orange', marginBottom: '20px' }}>
            ⚠️ No courses found in the database. Please create courses first.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Student Username</label>
          <select
            value={studentUsername}
            onChange={(e) => setStudentUsername(e.target.value)}
            required
            disabled={loading || students.length === 0}
          >
            <option value="">
              {loading ? "Loading..." : students.length === 0 ? "No students available" : "Select a student"}
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.username}>
                {student.username} {student.email ? `(${student.email})` : ''}
              </option>
            ))}
          </select>

          <label>Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            disabled={loading || courses.length === 0}
          >
            <option value="">
              {loading ? "Loading..." : courses.length === 0 ? "No courses available" : "Select a course"}
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>

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
