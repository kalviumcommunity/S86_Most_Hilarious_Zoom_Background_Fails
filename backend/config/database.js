const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
    console.log('✅ Connected to MySQL');
    return connection;
  } catch (error) {
    console.error('❌ Error connecting to DB:', error.message);
    throw error;
  }
};

module.exports = { connectDB };
