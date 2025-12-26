const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Announcement = require('./announcement');
const AnnouncementAttribute = require('./announcementAttribute');

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
    references: {
      model: Announcement,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  attributeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AnnouncementAttribute,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  indexes: [
    { unique: true, fields: ['announcementId', 'attributeId'] },
    { fields: ['announcementId'] },
    { fields: ['attributeId'] },
  ],
});

module.exports = AnnouncementAttributeValue;
