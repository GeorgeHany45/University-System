const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./db");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const assignmentRoutes = require("./routes/assignments");
const questionnaireRoutes = require("./routes/questionnaire");
const gradeRoutes = require("./routes/grades");
const messageRoutes = require("./routes/messages");
const announcementRoutes = require("./routes/announcements");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/grades", gradeRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/announcements", announcementRoutes);

const PORT = 5001;

const startServer = async () => {
  await connectDB();

  // Import all models to ensure they're registered
  require("./models/users");
  require("./models/course");
  require("./models/courseEnrollment");
  require("./models/assignment");
  require("./models/grade");
  require("./models/message");
  require("./models/announcement");
  // EAV models for announcements
  require("./models/announcementAttribute");
  require("./models/announcementAttributeValue");
  require("./models/questionnaire");

  // Set up associations for EAV models (avoid circular requires in model files)
  try {
    const Announcement = require("./models/announcement");
    const AnnouncementAttribute = require("./models/announcementAttribute");
    const AnnouncementAttributeValue = require("./models/announcementAttributeValue");

    Announcement.hasMany(AnnouncementAttributeValue, { foreignKey: 'announcementId', as: 'attributes' });
    AnnouncementAttributeValue.belongsTo(Announcement, { foreignKey: 'announcementId' });

    AnnouncementAttribute.hasMany(AnnouncementAttributeValue, { foreignKey: 'attributeId' });
    AnnouncementAttributeValue.belongsTo(AnnouncementAttribute, { foreignKey: 'attributeId', as: 'attribute' });
  } catch (e) {
    console.warn('EAV associations setup skipped:', e.message);
  }

  // Sync models (create tables if they don't exist)
  // Use alter: false to avoid data loss, but ensure tables are created
  await sequelize.sync({ alter: false }).then(() => {
    console.log("Database models synced successfully");
  }).catch((err) => {
    console.error("Error syncing database:", err);
    // Continue anyway - tables might already exist
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
