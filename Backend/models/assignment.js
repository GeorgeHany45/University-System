const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const Course = require("./course");
const User = require("./users");

const Assignment = sequelize.define("Assignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Association: An assignment belongs to a course
Assignment.belongsTo(Course, {
  foreignKey: "courseId",
  onDelete: "CASCADE",
});

// Association: An assignment is created by a teacher
Assignment.belongsTo(User, {
  foreignKey: "teacherId",
  onDelete: "CASCADE",
});

module.exports = Assignment;
