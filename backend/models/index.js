const User = require('./User');
const Comment = require('./Comment');

// Set up model relationships
User.hasMany(Comment, { foreignKey: 'createdBy' });
Comment.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = {
  User,
  Comment,
};
