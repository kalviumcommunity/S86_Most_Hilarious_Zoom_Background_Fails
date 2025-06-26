const express = require('express');
const sequelize = require('./config/sequelize');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  
  // Sync the models with the database
  try {
    await sequelize.sync();  // Creates the tables if they don't exist
    console.log('✅ Models synchronized with the database');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error.message);
  }
});
