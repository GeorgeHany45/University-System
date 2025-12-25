import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./assignmentdetails.css";

const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/assignments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return <div className="loading">Loading assignment...</div>;
  }

  if (!assignment) {
    return (
      <div className="not-found-container">
        <h1>Assignment Not Found</h1>
        <button onClick={() => navigate("/student-dashboard/assignments")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="assignment-details-container">
      <button
        onClick={() => navigate("/student-dashboard/assignments")}
        className="btn-back"
      >
        ← Back
      </button>

      <h1>{assignment.title}</h1>

      <div className="info-card">
        <p><strong>Course:</strong> {assignment.Course?.name}</p>
        <p><strong>Due Date:</strong> {formatDate(assignment.dueDate)}</p>
        <p><strong>Description:</strong></p>
        <p>{assignment.description}</p>

        {assignment.grade && (
          <p className="grade">
            <strong>Grade:</strong> {assignment.grade}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetails;
