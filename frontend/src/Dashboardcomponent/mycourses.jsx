import React, { useState, useEffect } from "react";
import "./mycourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCurrentUserId = () => {
    return localStorage.getItem("userId") || "1";
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const fetchStudentCourses = async () => {
    const userId = getCurrentUserId();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/student/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setCourses(data.courses);
      } else {
        setError(data.message || "Failed to fetch courses");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDropCourse = async (enrollmentId) => {
    if (!window.confirm("Are you sure you want to drop this course?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/unenroll/${enrollmentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCourses(courses.filter((c) => c.id !== enrollmentId));
        alert("Course dropped successfully");
      } else {
        alert("Failed to drop course");
      }
    } catch (err) {
      console.error("Error dropping course:", err);
      alert("Server error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="my-courses-container">
        <h1>My Courses</h1>
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="my-courses-container">
      <h1>My Courses</h1>

      {error && <div className="error-message">{error}</div>}

      {courses.length === 0 ? (
        <div className="no-courses-message">
          <p>You haven't enrolled in any courses yet.</p>
          <p>Start by visiting the "Add Courses" section to enroll in courses.</p>
        </div>
      ) : (
        <>
          <div className="courses-stats">
            <div className="stat">
              <span className="stat-label">Total Courses:</span>
              <span className="stat-value">{courses.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Credits:</span>
              <span className="stat-value">{totalCredits}</span>
            </div>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <h3 className="course-code">{course.courseCode}</h3>
                  <span className="course-credits">{course.credits} Credits</span>
                </div>

                <h2 className="course-name">{course.courseTitle}</h2>

                <div className="course-info">
                  <div className="info-row">
                    <span className="info-label">Department:</span>
                    <span className="info-value">{course.department}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Instructor:</span>
                    <span className="info-value">{course.instructor}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Semester:</span>
                    <span className="info-value">{course.semester}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Enrolled Date:</span>
                    <span className="info-value">
                      {new Date(course.enrolledDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="course-details">
                  {course.courseData && (
                    <>
                      <div className="detail">
                        <p className="detail-label">Schedule:</p>
                        <p className="detail-value">
                          {course.courseData.schedule.days.join(", ")}{" "}
                          {course.courseData.schedule.time}
                        </p>
                      </div>
                      <div className="detail">
                        <p className="detail-label">Location:</p>
                        <p className="detail-value">
                          {course.courseData.schedule.room}
                        </p>
                      </div>
                      {course.courseData.lmsLink && (
                        <div className="detail">
                          <a
                            href={course.courseData.lmsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lms-link"
                          >
                            Access LMS →
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <button
                  className="drop-btn"
                  onClick={() => handleDropCourse(course.id)}
                >
                  Drop Course
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCourses;
