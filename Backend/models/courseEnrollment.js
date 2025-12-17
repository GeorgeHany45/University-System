const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./users");

const CourseEnrollment = sequelize.define("CourseEnrollment", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enrolledDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  courseData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = CourseEnrollment;
