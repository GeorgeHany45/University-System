const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./users");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  messageType: {
    type: DataTypes.ENUM("question", "meeting_request", "general"),
    defaultValue: "general",
  },
  meetingDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  meetingStatus: {
    type: DataTypes.ENUM("pending", "approved", "rejected", "completed"),
    allowNull: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Define associations
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

module.exports = Message;

