import React, { useState } from "react";
import Messaging from "./messaging";
import Announcements from "./announcements";
import "./community.css";

const Community = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const currentUserRole = localStorage.getItem("role") || "student";
  const isAdmin = currentUserRole === "admin";

  return (
    <div className="community-container">
      <div className="community-tabs">
        <button
          className={activeTab === "announcements" ? "active" : ""}
          onClick={() => setActiveTab("announcements")}
        >
          📢 Announcements & Events
        </button>
        {!isAdmin && (
          <button
            className={activeTab === "messaging" ? "active" : ""}
            onClick={() => setActiveTab("messaging")}
          >
            💬 Student-Staff Communication
          </button>
        )}
      </div>

      <div className="community-content">
        {activeTab === "announcements" && <Announcements />}
        {!isAdmin && activeTab === "messaging" && <Messaging />}
      </div>
    </div>
  );
};

export default Community;

