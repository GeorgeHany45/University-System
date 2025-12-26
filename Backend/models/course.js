const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  catalogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  instructorName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  enrolled: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  prerequisites: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  schedule: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  lmsLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  extraData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Course;
