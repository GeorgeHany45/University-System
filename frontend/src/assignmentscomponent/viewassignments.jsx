import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./viewassignments.css";

const ViewAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5001/api/assignments/student/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAssignments(data);
        } else if (Array.isArray(data.assignments)) {
          setAssignments(data.assignments);
        } else if (Array.isArray(data.rows)) {
          setAssignments(data.rows);
        } else {
          setAssignments([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      });
  }, []);

  const getFilteredAssignments = () => {
    if (!Array.isArray(assignments)) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return assignments.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      if (filter === "overdue") {
        return dueDate < today;
      } else if (filter === "upcoming") {
        return dueDate >= today;
      }
      return true;
    });
  };

  const getStatusBadge = (assignment) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(assignment.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return <span className="badge badge-overdue">Overdue</span>;
    } else if (
      dueDate.getTime() === today.getTime() ||
      (dueDate > today && dueDate <= new Date(today.getTime() + 3 * 86400000))
    ) {
      return <span className="badge badge-due-soon">Due Soon</span>;
    }
    return <span className="badge badge-pending">Pending</span>;
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

  const filteredAssignments = getFilteredAssignments();

  return (
    <div className="view-assignments-container">
      <div className="assignments-header">
        <h1>My Assignments</h1>
        <p className="subtitle">Track all your assignments and due dates</p>
      </div>

      <div className="filter-section">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({assignments.length})
        </button>
        <button
          className={`filter-btn ${filter === "overdue" ? "active" : ""}`}
          onClick={() => setFilter("overdue")}
        >
          Overdue
        </button>
        <button
          className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </button>
      </div>

      <div className="assignments-list">
        {filteredAssignments.length === 0 ? (
          <div className="no-assignments">No assignments found</div>
        ) : (
          filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-card-header">
                <h3>{assignment.title}</h3>
                {getStatusBadge(assignment)}
              </div>

              <div className="assignment-meta">
                <span className="course-badge">
                  {assignment.Course?.code || assignment.Course?.title || "Course"}
                </span>
                <span className="due-date">
                  Due: {formatDate(assignment.dueDate)}
                </span>
              </div>

              <p className="assignment-description">
                {assignment.description}
              </p>

              {assignment.filePath && (
                <div className="assignment-file">
                  <a
                    href={`http://localhost:5001/${assignment.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-link"
                  >
                    📄 Download Assignment
                  </a>
                </div>
              )}

              <div className="assignment-footer">
                <button
                  className="btn-details"
                  onClick={() =>
                    navigate(`/student-dashboard/assignments/${assignment.id}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAssignments;