const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL using Sequelize');
  })
  .catch((error) => {
    console.error('❌ Error connecting to MySQL using Sequelize:', error.message);
  });

module.exports = sequelize;  // Export the sequelize instance
