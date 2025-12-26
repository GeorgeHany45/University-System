const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const Course = require("./course");
const User = require("./users");

const Grade = sequelize.define("Grade", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
Grade.belongsTo(User, { foreignKey: "studentId", as: "student" });
Grade.belongsTo(Course, { foreignKey: "courseId", as: "course" });

module.exports = Grade;
