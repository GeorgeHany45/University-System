import React from "react";
import DashboardCard from "./dashboardcard";

import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const navigate = useNavigate()
    
    const handleMyCourses = () => {
        navigate('/student-dashboard/mycourses')
    }
    
    const handleAddCourse = () => {
        navigate('/student-dashboard/addcourse')
    }

    const handleViewAssignments = () => {
        navigate('/student-dashboard/assignments')
    }

    const handleViewGrades = () => {
        navigate('/student-dashboard/grades')
    }

    const handleViewQuestionnaires = () => {
        navigate('/student-dashboard/questionnaires')
    }
    
  return (
    <div className="dashboard-container">
      <h1 className="dash-title">Student Dashboard</h1>

      <div className="dash-grid">

        <DashboardCard
          icon={<i className="fas fa-book-open"></i>}
          title="My Courses"
          description="View all your enrolled courses."
          buttonText="Access Now"
          onClick={handleMyCourses}
        />

        <DashboardCard
          icon={<i className="fas fa-plus-square"></i>}
          title="Add Courses"
          description="Register for new available courses."
          buttonText="Go There"
          onClick={handleAddCourse}
        />

        <DashboardCard
          icon={<i className="fas fa-tasks"></i>}
          title="Assignments"
          description="Check and submit your assignments."
          buttonText="View Now"
          onClick={handleViewAssignments}
        />

        <DashboardCard
          icon={<i className="fas fa-award"></i>}
          title="Grades"
          description="View your course performance and grades."
          buttonText="Show Grades"
          onClick={handleViewGrades}
        />

        <DashboardCard
          icon={<i className="fas fa-clipboard-list"></i>}
          title="Questionnaires"
          description="Complete teacher feedback questionnaires."
          buttonText="Answer Now"
          onClick={handleViewQuestionnaires}
        />

      </div>
    </div>
  );
};

export default StudentDashboard;
