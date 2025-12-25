const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Grade = sequelize.define("Grade", {
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});


module.exports = Grade;
