const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Stores attribute values for announcements (EAV value table)
const AnnouncementAttributeValue = sequelize.define('AnnouncementAttributeValue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  announcementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attributeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = AnnouncementAttributeValue;
