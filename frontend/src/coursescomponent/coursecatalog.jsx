import React, { useState, useEffect } from "react";
import { coursesData as fallbackCourses } from "../data/coursedata";
import { catalogsData } from "../data/coursecatalog";
import "./coursecatalog.css";

const CourseCatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [addedCourses, setAddedCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/courses/all');
      if (!res.ok) throw new Error('no backend');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (err) {
      // fallback to local data
      setCourses(fallbackCourses);
    }
  };

  const getCurrentUserId = () => {
    return localStorage.getItem("userId") || "1";
  };

  const filterCoursesByCategory = (catalogId) => {
    return courses.filter((course) => course.catalogId === parseInt(catalogId));
  };

  const handleAddCourse = async (course) => {
    const userId = getCurrentUserId();

    try {
      const response = await fetch("http://localhost:5001/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId),
          courseId: course.id,
          courseCode: course.code,
          courseTitle: course.title,
          department: course.department || course.department,
          credits: course.credits || 3,
          instructor: course.instructorName || course.instructor || '',
          semester: course.semester || '',
          courseData: course,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAddedCourses([...addedCourses, course.id]);
        setSuccessMessage(`Successfully added ${course.title}!`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Failed to add course");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      alert("Server error. Please try again.");
    }
  };

  const selectedCatalog = catalogsData.find((cat) => cat.id === parseInt(selectedCategory));
  const coursesInCategory = filterCoursesByCategory(selectedCategory);

  return (
    <div className="course-catalog-page">
      <h1 className="catalog-main-title">Course Catalog</h1>

      {successMessage && (
        <div className="success-alert">{successMessage}</div>
      )}

      {/* Category Selection */}
      <div className="category-selector">
        <h3>Select a Category:</h3>
        <div className="category-grid">
          {catalogsData.map((catalog) => (
            <button
              key={catalog.id}
              className={`category-btn ${
                parseInt(selectedCategory) === catalog.id ? "active" : ""
              }`}
              style={{
                borderColor:
                  parseInt(selectedCategory) === catalog.id ? catalog.color : "#ccc",
                backgroundColor:
                  parseInt(selectedCategory) === catalog.id
                    ? catalog.color + "20"
                    : "transparent",
              }}
              onClick={() => setSelectedCategory(catalog.id)}
            >
              <span className="category-icon">{catalog.icon}</span>
              <span className="category-name">{catalog.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Courses in Selected Category */}
      <div className="courses-list-container">
        <h2 style={{ color: selectedCatalog?.color || '#333' }}>
          {selectedCatalog?.name || 'Courses'} Courses
        </h2>

        {coursesInCategory.length === 0 ? (
          <p className="no-courses">No courses available in this category.</p>
        ) : (
          <div className="courses-table">
            <div className="courses-header">
              <div className="col-code">Code</div>
              <div className="col-title">Title</div>
              <div className="col-instructor">Instructor</div>
              <div className="col-credits">Credits</div>
              <div className="col-schedule">Schedule</div>
              <div className="col-action">Action</div>
            </div>

            {coursesInCategory.map((course) => (
              <div key={course.id} className="course-row">
                <div className="col-code">{course.code}</div>
                <div className="col-title">
                  <div className="course-title">{course.title}</div>
                  <div className="course-desc">{course.description}</div>
                </div>
                <div className="col-instructor">{course.instructorName || course.instructor || ''}</div>
                <div className="col-credits">{course.credits}</div>
                <div className="col-schedule">
                  <div className="schedule-item">
                    {(course.schedule && course.schedule.days) ? course.schedule.days.join(", ") : ''}
                  </div>
                  <div className="schedule-item">{(course.schedule && course.schedule.time) || ''}</div>
                </div>
                <div className="col-action">
                  <button
                    className={`add-course-btn ${
                      addedCourses.includes(course.id) ? "added" : ""
                    }`}
                    onClick={() => handleAddCourse(course)}
                    disabled={addedCourses.includes(course.id)}
                    style={{
                      backgroundColor: addedCourses.includes(course.id)
                        ? "#4caf50"
                        : selectedCatalog?.color || '#2196f3',
                    }}
                  >
                    {addedCourses.includes(course.id) ? "✓ Added" : "Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalogPage;
