import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./dashboardcard";
import "./dashboard.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <h1 className="dash-title">Teacher Dashboard</h1>

      <div className="dash-grid">
        

        <DashboardCard
          icon={<i className="fas fa-file-upload"></i>}
          title="Upload Assignments"
          description="Upload assignments for your students."
          buttonText="Upload"
          onClick={() => navigate("/teacher/upload-assignment")}
        />

        <DashboardCard
          icon={<i className="fas fa-chart-line"></i>}
          title="Upload Grades"
          description="Grade your students and submit results."
          buttonText="Submit"
          onClick={() => navigate("/upload-grades")}

        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
