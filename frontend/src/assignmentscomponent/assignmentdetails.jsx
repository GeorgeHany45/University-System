import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./assignmentdetails.css";

const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  // Dummy assignments data (until backend is ready)
  const dummyAssignments = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Create a simple React component that displays a list of items.",
      fullDescription: `
        In this assignment, you will create a React component that demonstrates your understanding of:
        
        • Component structure and JSX syntax
        • Props and state management
        • Event handling
        • List rendering with .map()
        • Basic styling with CSS
        
        Requirements:
        - Create a functional component that displays a list of items
        - Allow users to add new items to the list
        - Allow users to delete items from the list
        - Style the component with CSS or CSS modules
        - Write at least 3 test cases using React Testing Library
        
        Guidelines:
        - Use React hooks (useState) for state management
        - Create reusable components
        - Follow React best practices
        - Submit your code as a GitHub repository link
      `,
      dueDate: "2025-12-25",
      courseId: 1,
      courseName: "Web Development",
      instructorName: "John Doe",
      instructorEmail: "john.doe@university.edu",
      status: "pending",
      submitted: false,
      submittedDate: null,
      grade: null,
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Quiz",
      description: "Complete a 20-question quiz on JavaScript basics.",
      fullDescription: `
        This quiz tests your knowledge of JavaScript fundamentals including:
        
        Topics Covered:
        • Variables and data types
        • Operators and expressions
        • Control flow (if/else, loops)
        • Functions and scope
        • Arrays and objects
        • DOM manipulation
        • Async/await and promises
        
        Format:
        - 20 multiple-choice questions
        - Time limit: 45 minutes
        - Passing score: 70%
        
        Tips:
        - Review your notes before taking the quiz
        - Take your time reading each question carefully
        - You can review your answers before submitting
        - No external resources are allowed
      `,
      dueDate: "2025-12-22",
      courseId: 1,
      courseName: "Web Development",
      instructorName: "John Doe",
      instructorEmail: "john.doe@university.edu",
      status: "overdue",
      submitted: false,
      submittedDate: null,
      grade: null,
    },
    {
      id: 3,
      title: "Database Design Project",
      description: "Design and implement a relational database for a small business.",
      fullDescription: `
        In this comprehensive project, you will design and implement a complete database solution for a small e-commerce business.
        
        Project Scope:
        • Requirements analysis and documentation
        • Entity-Relationship Diagram (ERD)
        • Database schema design (normalization)
        • SQL implementation
        • Query optimization
        • Documentation and presentation
        
        Deliverables:
        1. Requirements document (2-3 pages)
        2. ERD diagram with explanations
        3. Database schema (SQL DDL)
        4. Sample queries and procedures
        5. Performance analysis
        6. Presentation (10 minutes)
        
        Business Context:
        The business sells products, manages inventory, processes orders, and tracks customer information.
      `,
      dueDate: "2025-12-28",
      courseId: 2,
      courseName: "Database Management",
      instructorName: "Jane Smith",
      instructorEmail: "jane.smith@university.edu",
      status: "pending",
      submitted: false,
      submittedDate: null,
      grade: null,
    },
    {
      id: 4,
      title: "API Development",
      description: "Build a REST API with Node.js and Express.",
      fullDescription: `
        Build a fully functional REST API using Node.js and Express framework.
        
        Requirements:
        • Create at least 5 endpoints (GET, POST, PUT, DELETE)
        • Implement proper error handling
        • Use authentication (JWT)
        • Implement data validation
        • Write API documentation
        • Include unit tests
        
        Technology Stack:
        - Node.js
        - Express.js
        - MongoDB or PostgreSQL
        - JWT for authentication
        - Jest/Mocha for testing
        
        Deliverables:
        - GitHub repository with clean code
        - README with API documentation
        - Test coverage report (>80%)
        - Postman collection
      `,
      dueDate: "2025-12-20",
      courseId: 2,
      courseName: "Backend Development",
      instructorName: "Mike Johnson",
      instructorEmail: "mike.johnson@university.edu",
      status: "overdue",
      submitted: true,
      submittedDate: "2025-12-19",
      grade: 85,
    },
    {
      id: 5,
      title: "Web Security Best Practices",
      description: "Write a report on web security vulnerabilities and prevention methods.",
      fullDescription: `
        Write a comprehensive report on modern web security threats and best practices for mitigation.
        
        Content Requirements:
        • Executive summary
        • Introduction to web security
        • Top 10 OWASP vulnerabilities analysis
        • Common attack vectors
        • Prevention and mitigation strategies
        • Case studies (2-3 real incidents)
        • Best practices checklist
        • Conclusion and recommendations
        
        Format:
        - Length: 15-20 pages
        - Professional formatting
        - APA citation style
        - Include diagrams and examples
        
        Topics to Cover:
        - SQL Injection
        - Cross-Site Scripting (XSS)
        - Cross-Site Request Forgery (CSRF)
        - Authentication & Authorization
        - Data Encryption
        - Secure Coding Practices
      `,
      dueDate: "2026-01-05",
      courseId: 3,
      courseName: "Cybersecurity",
      instructorName: "Sarah Williams",
      instructorEmail: "sarah.williams@university.edu",
      status: "pending",
      submitted: false,
      submittedDate: null,
      grade: null,
    },
    {
      id: 6,
      title: "Frontend Performance Optimization",
      description: "Optimize a given website for better performance and user experience.",
      fullDescription: `
        Analyze and optimize a provided website for performance and user experience improvements.
        
        Tasks:
        • Performance audit using Lighthouse/WebPageTest
        • Identify bottlenecks (rendering, network, JavaScript)
        • Implement optimizations:
          - Code splitting
          - Lazy loading
          - Image optimization
          - CSS optimization
          - JavaScript minification
          - Caching strategies
        • Monitor and measure improvements
        
        Deliverables:
        - Before and after performance reports
        - Optimization checklist
        - Documentation of changes made
        - Performance metrics comparison
        
        Success Criteria:
        - Reduce page load time by 50%
        - Lighthouse score: >90
        - First Contentful Paint: <2 seconds
      `,
      dueDate: "2026-01-10",
      courseId: 3,
      courseName: "Advanced Frontend",
      instructorName: "Tom Brown",
      instructorEmail: "tom.brown@university.edu",
      status: "pending",
      submitted: false,
      submittedDate: null,
      grade: null,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundAssignment = dummyAssignments.find((a) => a.id === parseInt(id));
      if (foundAssignment) {
        setAssignment(foundAssignment);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleFileChange = (e) => {
    setSubmissionFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!submissionFile) {
      setSubmitMessage("Please select a file to submit.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitMessage("Assignment submitted successfully!");
      setSubmissionFile(null);
      setSubmitting(false);
      setTimeout(() => {
        navigate("/student-dashboard/assignments");
      }, 2000);
    }, 1500);
  };

  const getStatusBadge = () => {
    if (assignment.submitted) {
      return <span className="badge badge-submitted">Submitted</span>;
    }
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
      month: "long",
      day: "numeric",
    });
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(assignment.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const timeDiff = dueDate - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return `${Math.abs(daysRemaining)} days overdue`;
    } else if (daysRemaining === 0) {
      return "Due today";
    } else {
      return `${daysRemaining} days remaining`;
    }
  };

  if (loading) {
    return <div className="loading">Loading assignment details...</div>;
  }

  if (!assignment) {
    return (
      <div className="not-found-container">
        <h1>Assignment Not Found</h1>
        <button onClick={() => navigate("/student-dashboard/assignments")} className="btn-back">
          Back to Assignments
        </button>
      </div>
    );
  }

  return (
    <div className="assignment-details-container">
      <div className="details-header">
        <button onClick={() => navigate("/student-dashboard/assignments")} className="btn-back">
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="header-content">
          <h1>{assignment.title}</h1>
          {getStatusBadge()}
        </div>
      </div>

      <div className="details-grid">
        {/* Main Content */}
        <div className="details-main">
          <div className="info-card">
            <h2>Assignment Details</h2>
            <div className="details-info">
              <div className="info-row">
                <span className="label">Course:</span>
                <span className="value">{assignment.courseName}</span>
              </div>
              <div className="info-row">
                <span className="label">Instructor:</span>
                <span className="value">{assignment.instructorName}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <a href={`mailto:${assignment.instructorEmail}`} className="value">
                  {assignment.instructorEmail}
                </a>
              </div>
              <div className="info-row">
                <span className="label">Due Date:</span>
                <span className="value">{formatDate(assignment.dueDate)}</span>
              </div>
              <div className="info-row">
                <span className="label">Time Remaining:</span>
                <span className={`value ${assignment.submitted ? "" : "highlight"}`}>
                  {assignment.submitted ? "Submitted" : calculateDaysRemaining()}
                </span>
              </div>
              {assignment.submitted && (
                <>
                  <div className="info-row">
                    <span className="label">Submitted On:</span>
                    <span className="value">{formatDate(assignment.submittedDate)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Grade:</span>
                    <span className="value grade">{assignment.grade || "Pending"}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="description-card">
            <h2>Description</h2>
            <p className="short-desc">{assignment.description}</p>
            <div className="full-description">
              {assignment.fullDescription.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="details-sidebar">
          {!assignment.submitted && (
            <div className="submission-card">
              <h3>Submit Assignment</h3>
              <div className="upload-section">
                <label htmlFor="file-input" className="file-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Choose File</span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                  disabled={submitting}
                />
                {submissionFile && (
                  <p className="file-name">
                    <i className="fas fa-check-circle"></i> {submissionFile.name}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="btn-submit-final"
                disabled={!submissionFile || submitting}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Submit Now
                  </>
                )}
              </button>

              {submitMessage && (
                <p className={`message ${submitMessage.includes("success") ? "success" : "error"}`}>
                  {submitMessage}
                </p>
              )}
            </div>
          )}

          <div className="quick-info-card">
            <h3>Quick Info</h3>
            <div className="quick-info">
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="value">{assignment.submitted ? "Submitted" : "Pending"}</span>
              </div>
              <div className="info-item">
                <span className="label">Priority:</span>
                <span className={`value priority-${assignment.status}`}>
                  {assignment.status.toUpperCase()}
                </span>
              </div>
              {assignment.submitted && (
                <div className="info-item">
                  <span className="label">Grade:</span>
                  <span className="value">{assignment.grade || "Pending"}</span>
                </div>
              )}
            </div>
          </div>

          <div className="resources-card">
            <h3>Resources</h3>
            <ul className="resources-list">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-file-pdf"></i> Assignment Guidelines
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-link"></i> Course Materials
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-video"></i> Tutorial Video
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-comments"></i> Discussion Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
