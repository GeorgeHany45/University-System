import React from "react";
import "./dashboard.css";

const DashboardCard = ({ icon, title, description, buttonText, onClick  }) => {
  return (
    <div className="dash-card">
      <div className="dash-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="dash-btn" onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default DashboardCard;
