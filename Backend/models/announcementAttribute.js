const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Stores attribute definitions for announcements (name, type)
const AnnouncementAttribute = sequelize.define('AnnouncementAttribute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dataType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'text',
  },
});

module.exports = AnnouncementAttribute;
