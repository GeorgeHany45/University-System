import React from "react";
import DashboardCard from "./dashboardcard";
import "./dashboard.css";

const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dash-title">Teacher Dashboard</h1>

      <div className="dash-grid">

        <DashboardCard   
          icon={<i className="fas fa-upload"></i>} // Upload courses
          title="Upload Courses"
          description="Create and upload new course materials."
          buttonText="Upload"
        />

        <DashboardCard
          icon={<i className="fas fa-file-upload"></i>} // Upload assignments
          title="Upload Assignments"
          description="Upload assignments for your students."
          buttonText="Upload"
        />

        <DashboardCard
          icon={<i className="fas fa-chart-line"></i>} // Upload grades / track performance
          title="Upload Grades"
          description="Grade your students and submit results."
          buttonText="Submit"
        />

      </div>
    </div>
  );
};

export default TeacherDashboard;
