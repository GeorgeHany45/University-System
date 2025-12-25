import React, { useState } from "react";
import "./uploadassignment.css";

const UploadAssignment = () => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("deadline", deadline);
    formData.append("description", description);
    formData.append("file", file); 

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
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="upload-assignment-page">
      <div className="upload-assignment-card">
        <h2>Upload Assignment</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit">Upload Assignment</button>
        </form>
      </div>
    </div>
  );
};

export default UploadAssignment;
