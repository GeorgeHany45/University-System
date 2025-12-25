import React, { useMemo, useState, useEffect } from "react";
import "./viewgrades.css";


const gradePoints = {
  "A+": 4.0,
  "A": 3.7,
  "A-": 3.4,
  "B+": 3.2,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.4,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.4,
  "D": 1.0,
  "F": 0.0,
};

const ViewGrades = () => {
  const [gradesData, setGradesData] = useState({
    studentName: "Student",
    terms: [],
  });
  const [selectedTermId, setSelectedTermId] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch grades from backend
  
  useEffect(() => {
    const studentId = localStorage.getItem("userId");
    const username = localStorage.getItem("username") || "Student";

    fetch(`http://localhost:5001/api/grades/student/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        
        const termsMap = {};

        data.forEach((g) => {
          const termId = g.termId || "summer-2025";
          const termName = g.termName || "Summer 2025";

          if (!termsMap[termId]) {
            termsMap[termId] = {
              termId,
              termName,
              courses: [],
            };
          }

          termsMap[termId].courses.push({
            code: g.Course?.code || "CS-XXX",
            title: g.Course?.name || "Course",
            instructor: g.Course?.instructor || "Instructor",
            credits: g.Course?.credits || 3,
            grade: g.grade,
          });
        });

        const terms = Object.values(termsMap);

        setGradesData({
          studentName: username,
          terms,
        });

        setSelectedTermId(terms[0]?.termId || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const terms = useMemo(
    () => gradesData.terms || [],
    [gradesData.terms]
  );
  
  const selectedTerm = useMemo(
    () => terms.find((t) => t.termId === selectedTermId),
    [terms, selectedTermId]
  );

  
  // GPA calculation
   
  const computeGPA = (courses) => {
    if (!courses || courses.length === 0)
      return { gpa: 0, credits: 0, points: 0 };

    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach((c) => {
      const gp = gradePoints[c.grade] ?? 0;
      totalCredits += c.credits;
      totalPoints += gp * c.credits;
    });

    const gpa = totalCredits ? totalPoints / totalCredits : 0;

    return {
      gpa: Number(gpa.toFixed(2)),
      credits: totalCredits,
      points: Number(totalPoints.toFixed(2)),
    };
  };

  const summary = computeGPA(selectedTerm?.courses || []);

  if (loading) {
    return <div className="loading">Loading grades...</div>;
  }

  return (
    <div className="grades-container">
      <div className="grades-header">
        <h1>Grades</h1>
        <p className="subtitle">View your academic performance</p>
        <div className="student-info">
          <span className="label">Student:</span>
          <span className="value">{gradesData.studentName}</span>
        </div>
      </div>

      {/* Term Selector */}
      <div className="term-selector">
        {terms.map((term) => (
          <button
            key={term.termId}
            className={`term-btn ${
              selectedTermId === term.termId ? "active" : ""
            }`}
            onClick={() => setSelectedTermId(term.termId)}
          >
            {term.termName}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="term-summary">
        <div className="summary-card">
          <div className="summary-title">{selectedTerm?.termName}</div>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Total Credits</span>
              <span className="value">{summary.credits}</span>
            </div>
            <div className="summary-item">
              <span className="label">Total Points</span>
              <span className="value">{summary.points}</span>
            </div>
            <div className="summary-item">
              <span className="label">Term GPA</span>
              <span className="value gpa">{summary.gpa}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="grades-table">
        <div className="table-header">
          <div className="col code">Code</div>
          <div className="col title">Course Title</div>
          <div className="col instructor">Instructor</div>
          <div className="col credits">Credits</div>
          <div className="col grade">Grade</div>
          <div className="col points">Points</div>
        </div>

        {(selectedTerm?.courses || []).map((course, idx) => (
          <div key={`${course.code}-${idx}`} className="table-row">
            <div className="col code">{course.code}</div>
            <div className="col title">{course.title}</div>
            <div className="col instructor">{course.instructor}</div>
            <div className="col credits">{course.credits}</div>
            <div className="col grade">
              <span
                className={`badge badge-${(course.grade || "")
                  .replace("+", "plus")
                  .replace("-", "minus")
                  .toLowerCase()}`}
              >
                {course.grade}
              </span>
            </div>
            <div className="col points">
              {(gradePoints[course.grade] || 0).toFixed(1)}
            </div>
          </div>
        ))}
      </div>

      
      <div className="legend">
        <p className="legend-title">Grade Scale</p>
        <div className="legend-grid">
          {Object.entries(gradePoints).map(([letter, pts]) => (
            <div key={letter} className="legend-item">
              <span className="legend-grade">{letter}</span>
              <span className="legend-points">{pts.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewGrades;
