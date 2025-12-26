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
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
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
  filePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Association: An assignment belongs to a course
Assignment.belongsTo(Course, {
  foreignKey: "courseId",
  as: "Course",
  onDelete: "CASCADE",
});

// Association: An assignment is created by a teacher
Assignment.belongsTo(User, {
  foreignKey: "teacherId",
  as: "teacher",
  onDelete: "CASCADE",
});

module.exports = Assignment;
