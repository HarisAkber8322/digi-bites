const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Host for the remote MySQL server
  user: process.env.DB_USER,         // Username for MySQL
  password: process.env.DB_PASSWORD, // Password for MySQL user
  database: process.env.DB_NAME,     // The name of the database
  port: process.env.DB_PORT || 3306, // Port, usually 3306 for MySQL
  waitForConnections: true,          // Wait for connections if the pool is busy
  connectionLimit: 10,               // Limit of connections in the pool
  queueLimit: 0                      // No limit on the queue
});

module.exports = pool;
