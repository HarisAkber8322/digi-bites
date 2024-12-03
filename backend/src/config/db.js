const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  user: "pma",
  host: "localhost",
  database: "digibites",
  password: '', // Ensure blank password is handled
  port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
});

module.exports = pool;
