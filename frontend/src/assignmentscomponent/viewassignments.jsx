import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./viewassignments.css";

const ViewAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Dummy assignments data (until backend is ready)
  const dummyAssignments = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Create a simple React component that displays a list of items.",
      dueDate: "2025-12-25",
      courseId: 1,
      courseName: "Web Development",
      status: "pending",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Quiz",
      description: "Complete a 20-question quiz on JavaScript basics.",
      dueDate: "2025-12-22",
      courseId: 1,
      courseName: "Web Development",
      status: "pending",
    },
    {
      id: 3,
      title: "Database Design Project",
      description: "Design and implement a relational database for a small business.",
      dueDate: "2025-12-28",
      courseId: 2,
      courseName: "Database Management",
      status: "pending",
    },
    {
      id: 4,
      title: "API Development",
      description: "Build a REST API with Node.js and Express.",
      dueDate: "2025-12-20",
      courseId: 2,
      courseName: "Backend Development",
      status: "overdue",
    },
    {
      id: 5,
      title: "Web Security Best Practices",
      description: "Write a report on web security vulnerabilities and prevention methods.",
      dueDate: "2026-01-05",
      courseId: 3,
      courseName: "Cybersecurity",
      status: "pending",
    },
    {
      id: 6,
      title: "Frontend Performance Optimization",
      description: "Optimize a given website for better performance and user experience.",
      dueDate: "2026-01-10",
      courseId: 3,
      courseName: "Advanced Frontend",
      status: "pending",
    },
  ];

  useEffect(() => {
    // Simulate loading from backend
    setLoading(true);
    setTimeout(() => {
      setAssignments(dummyAssignments);
      setLoading(false);
    }, 500);
  }, []);

  // Filter assignments
  const getFilteredAssignments = () => {
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
      (dueDate > today && dueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000))
    ) {
      return <span className="badge badge-due-soon">Due Soon</span>;
    }
    return <span className="badge badge-pending">Pending</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredAssignments = getFilteredAssignments();

  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

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
          All Assignments ({assignments.length})
        </button>
        <button
          className={`filter-btn ${filter === "overdue" ? "active" : ""}`}
          onClick={() => setFilter("overdue")}
        >
          Overdue ({assignments.filter((a) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dueDate = new Date(a.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today;
          }).length})
        </button>
        <button
          className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming ({assignments.filter((a) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dueDate = new Date(a.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate >= today;
          }).length})
        </button>
      </div>

      <div className="assignments-list">
        {filteredAssignments.length === 0 ? (
          <div className="no-assignments">
            <i className="fas fa-inbox"></i>
            <p>No assignments found</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-card-header">
                <h3 className="assignment-title">{assignment.title}</h3>
                {getStatusBadge(assignment)}
              </div>

              <div className="assignment-meta">
                <span className="course-badge">{assignment.courseName}</span>
                <span className="due-date">
                  <i className="fas fa-calendar"></i> Due: {formatDate(assignment.dueDate)}
                </span>
              </div>

              <p className="assignment-description">{assignment.description}</p>

              <div className="assignment-footer">
                <button className="btn-submit">Submit Assignment</button>
                <button 
                  className="btn-details"
                  onClick={() => navigate(`/student-dashboard/assignments/${assignment.id}`)}
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
