import React from "react";
import "./staffpublic.css";

const dummyTeachers = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Associate Professor of Computer Science",
    email: "s.mitchell@university.edu",
    office: "Building A, Room 210",
    hours: "Mon & Wed 2:00-4:00 PM",
    bio: "Researching AI for education and human-computer interaction.",
  },
  {
    name: "Prof. James Carter",
    title: "Senior Lecturer in Data Science",
    email: "j.carter@university.edu",
    office: "Building B, Room 305",
    hours: "Tue & Thu 11:00 AM-1:00 PM",
    bio: "Focus on data visualization, analytics, and industry projects.",
  },
  {
    name: "Dr. Lina Park",
    title: "Assistant Professor of Software Engineering",
    email: "l.park@university.edu",
    office: "Innovation Hub, Room 118",
    hours: "Wed & Fri 9:30-11:30 AM",
    bio: "Passionate about agile teams, product design, and DevOps culture.",
  },
  {
    name: "Mr. Omar Khaled",
    title: "Instructor – Cloud & Systems",
    email: "o.khaled@university.edu",
    office: "Building C, Room 410",
    hours: "Sun & Tue 1:00-3:00 PM",
    bio: "Teaches cloud fundamentals, Linux, and container orchestration.",
  },
];

const StaffPublic = () => {
  return (
    <div className="staff-public-page">
      <div className="staff-hero">
        <div>
          <p className="staff-kicker">Meet Our Staff</p>
          <h1>Faculty & Teaching Team</h1>
          <p className="staff-subtitle">
            Explore our dedicated educators, their expertise, and how to reach them for guidance.
          </p>
        </div>
        <div className="staff-hero-badge">Open to everyone</div>
      </div>

      <div className="staff-grid">
        {dummyTeachers.map((t, idx) => (
          <div key={idx} className="staff-card">
            <div className="staff-card-header">
              <div className="staff-avatar">{t.name.charAt(0)}</div>
              <div>
                <h3>{t.name}</h3>
                <p className="staff-title">{t.title}</p>
              </div>
            </div>
            <p className="staff-bio">{t.bio}</p>
            <div className="staff-meta">
              <div>
                <span className="meta-label">Email</span>
                <span className="meta-value">{t.email}</span>
              </div>
              <div>
                <span className="meta-label">Office</span>
                <span className="meta-value">{t.office}</span>
              </div>
              <div>
                <span className="meta-label">Hours</span>
                <span className="meta-value">{t.hours}</span>
              </div>
            </div>
            <button className="staff-contact-btn">Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPublic;
