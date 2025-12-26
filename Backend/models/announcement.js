const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./users");

const Announcement = sequelize.define("Announcement", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  type: {
    type: DataTypes.ENUM("announcement", "event", "deadline"),
    defaultValue: "announcement",
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  eventLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetAudience: {
    type: DataTypes.ENUM("all", "students", "staff", "parents"),
    defaultValue: "all",
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high", "urgent"),
    defaultValue: "medium",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Define associations
Announcement.belongsTo(User, { foreignKey: "authorId", as: "author" });

module.exports = Announcement;

