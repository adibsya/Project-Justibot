const { Pool } = require("pg");
require("dotenv").config();

// Ensure password is a string
const password = String(process.env.DB_PASS);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: password, // Use the explicitly converted string
  port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Successfully connected to PostgreSQL database");
    release();
  }
});

module.exports = pool;
