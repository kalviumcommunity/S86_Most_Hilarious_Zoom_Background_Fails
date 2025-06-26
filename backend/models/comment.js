// models/Comment.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/Database').sequelize;
const User = require('./User'); // Import User model

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,   // Refers to the User model
      key: 'id',     // Foreign key in the Comment table
    },
  },
});

module.exports = Comment;
