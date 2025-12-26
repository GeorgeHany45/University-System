import React, { useState, useEffect } from "react";
import "./uploadassignment.css";

const UploadAssignment = () => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    // Get current teacher ID
    const userId = localStorage.getItem("userId");
    setTeacherId(userId || "");

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

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("deadline", deadline);
    formData.append("description", description);
    formData.append("file", file);
    if (teacherId) {
      formData.append("teacherId", teacherId);
    } 

    try {
      const res = await fetch("http://localhost:5001/api/assignments/upload", {
        method: "POST",
        body: formData,
      });
      

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Upload failed");
        return;
      }

      alert("Assignment uploaded successfully ");

      setCourseId("");
      setTitle("");
      setDeadline("");
      setDescription("");
      setFile(null);
      setFileName("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="upload-assignment-page">
      <div className="upload-assignment-card">
        <h2>Upload Assignment</h2>

        {loading && <p style={{ color: '#666', marginBottom: '20px' }}>Loading courses...</p>}
        {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
        
        {!loading && courses.length === 0 && (
          <p style={{ color: 'orange', marginBottom: '20px' }}>
            ⚠️ No courses found in the database. Please create courses first.
          </p>
        )}

        <form onSubmit={handleSubmit}>
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

          <label>Assignment Title</label>
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />

          <label>Assignment File (PDF)</label>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setFileName(selectedFile ? selectedFile.name : "");
            }}
            required
          />
          {fileName && (
            <p style={{ fontSize: "12px", color: "#666", marginTop: "-10px", marginBottom: "10px" }}>
              Selected: {fileName}
            </p>
          )}

          <button type="submit">Upload Assignment</button>
        </form>
      </div>
    </div>
  );
};

export default UploadAssignment;
