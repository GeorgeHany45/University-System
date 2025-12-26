import React, { useState, useEffect } from "react";
import "./announcements.css";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "announcement",
    eventDate: "",
    eventLocation: "",
    targetAudience: "all",
    priority: "medium",
  });

  const currentUserId = parseInt(localStorage.getItem("userId") || "1");
  const currentUserRole = localStorage.getItem("role") || "student";

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/announcements/all");
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const filterAnnouncements = React.useCallback(() => {
    if (activeFilter === "all") {
      setFilteredAnnouncements(announcements);
    } else {
      setFilteredAnnouncements(
        announcements.filter((ann) => ann.type === activeFilter)
      );
    }
  }, [announcements, activeFilter]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [filterAnnouncements]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        authorId: currentUserId,
        eventDate: formData.eventDate || null,
      };

      const res = await fetch("http://localhost:5001/api/announcements/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Announcement created successfully!");
        setFormData({
          title: "",
          content: "",
          type: "announcement",
          eventDate: "",
          eventLocation: "",
          targetAudience: "all",
          priority: "medium",
        });
        setShowCreateForm(false);
        fetchAnnouncements();
      } else {
        alert(data.message || "Failed to create announcement");
      }
    } catch (err) {
      console.error("Error creating announcement:", err);
      alert("Server error. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/announcements/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Announcement deleted successfully!");
        fetchAnnouncements();
      } else {
        alert("Failed to delete announcement");
      }
    } catch (err) {
      console.error("Error deleting announcement:", err);
      alert("Server error. Please try again.");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "#f44336";
      case "high":
        return "#ff9800";
      case "medium":
        return "#2196f3";
      case "low":
        return "#4caf50";
      default:
        return "#666";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "event":
        return "📅";
      case "deadline":
        return "⏰";
      default:
        return "📢";
    }
  };

  const canCreate = currentUserRole === "admin" || currentUserRole === "teacher";

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <h1>Announcements & Events Hub</h1>
        {canCreate && (
          <button
            className="create-btn"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "Cancel" : "+ Create Announcement"}
          </button>
        )}
      </div>

      {showCreateForm && canCreate && (
        <div className="create-announcement-form">
          <h2>Create New Announcement/Event</h2>
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <label>
                Type:
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                  <option value="deadline">Deadline</option>
                </select>
              </label>

              <label>
                Priority:
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </label>
            </div>

            <label>
              Title:
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Enter announcement title"
              />
            </label>

            <label>
              Content:
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                rows="6"
                placeholder="Enter announcement content"
              />
            </label>

            {(formData.type === "event" || formData.type === "deadline") && (
              <>
                <label>
                  Date & Time:
                  <input
                    type="datetime-local"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    required={formData.type === "event" || formData.type === "deadline"}
                  />
                </label>

                {formData.type === "event" && (
                  <label>
                    Location:
                    <input
                      type="text"
                      value={formData.eventLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventLocation: e.target.value,
                        })
                      }
                      placeholder="Event location (optional)"
                    />
                  </label>
                )}
              </>
            )}

            <label>
              Target Audience:
              <select
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
                required
              >
                <option value="all">All</option>
                <option value="students">Students</option>
                <option value="staff">Staff</option>
                <option value="parents">Parents</option>
              </select>
            </label>

            <button type="submit" className="submit-btn">
              Create Announcement
            </button>
          </form>
        </div>
      )}

      <div className="filter-tabs">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          All
        </button>
        <button
          className={activeFilter === "announcement" ? "active" : ""}
          onClick={() => setActiveFilter("announcement")}
        >
          📢 Announcements
        </button>
        <button
          className={activeFilter === "event" ? "active" : ""}
          onClick={() => setActiveFilter("event")}
        >
          📅 Events
        </button>
        <button
          className={activeFilter === "deadline" ? "active" : ""}
          onClick={() => setActiveFilter("deadline")}
        >
          ⏰ Deadlines
        </button>
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.length === 0 ? (
          <div className="no-announcements">
            <p>No announcements available in this category.</p>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="announcement-card"
              style={{
                borderLeft: `4px solid ${getPriorityColor(ann.priority)}`,
              }}
            >
              <div className="announcement-header">
                <div className="announcement-title-section">
                  <span className="type-icon">{getTypeIcon(ann.type)}</span>
                  <h3>{ann.title}</h3>
                  <span
                    className="priority-badge"
                    style={{
                      backgroundColor: getPriorityColor(ann.priority),
                    }}
                  >
                    {ann.priority.toUpperCase()}
                  </span>
                </div>
                {canCreate && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(ann.id)}
                  >
                    🗑️
                  </button>
                )}
              </div>

              <div className="announcement-meta">
                <span>
                  By: {ann.author?.username || "Unknown"} |{" "}
                  {new Date(ann.createdAt).toLocaleDateString()}
                </span>
                <span className="target-audience">
                  For: {ann.targetAudience}
                </span>
              </div>

              <div className="announcement-content">{ann.content}</div>

              {(ann.type === "event" || ann.type === "deadline") &&
                ann.eventDate && (
                  <div className="event-details">
                    <div className="event-date">
                      📅{" "}
                      {new Date(ann.eventDate).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {ann.eventLocation && (
                      <div className="event-location">
                        📍 {ann.eventLocation}
                      </div>
                    )}
                  </div>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;

