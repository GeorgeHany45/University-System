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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
      <div className="details-header">
        <button
          onClick={() => navigate("/student-dashboard/assignments")}
          className="btn-back"
        >
          ←
        </button>
        <div className="header-content">
          <h1>{assignment.title}</h1>
        </div>
      </div>

      <div className="details-grid">
        <div>
          <div className="description-card">
            <h2>Assignment Details</h2>
            <div className="full-description">
              {assignment.description || "No description provided."}
            </div>
          </div>

          {assignment.filePath && (
            <div className="resources-card">
              <h3>Assignment File</h3>
              <div className="file-download">
                <a
                  href={`http://localhost:5001/${assignment.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  📄 {assignment.fileName || "Download Assignment"}
                </a>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="quick-info-card">
            <h3>Quick Info</h3>
            <div className="quick-info">
              <div className="info-item">
                <span className="label">Course:</span>
                <span className="value">
                  {assignment.Course?.code || assignment.Course?.title || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Due Date:</span>
                <span className="value highlight">{formatDate(assignment.dueDate)}</span>
              </div>
              {assignment.teacher && (
                <div className="info-item">
                  <span className="label">Instructor:</span>
                  <span className="value">{assignment.teacher.username}</span>
                </div>
              )}
              {assignment.grade && (
                <div className="info-item">
                  <span className="label">Grade:</span>
                  <span className="value grade">{assignment.grade}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
