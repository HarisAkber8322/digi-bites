const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/users", usersRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require("express");
// const cors = require("cors");
// const usersRouter = require("./routes/userRoutes");
// const pool = require("./config/db"); // Import your database pool

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/users", usersRouter);

// // Test DB Connection before starting the server
// async function testDbConnection() {
//   try {
//     // Try a simple query to check the connection
//     const [rows] = await pool.query('SELECT 1');
//     console.log("Database connected successfully:", rows);
    
//     // If the connection is successful, start the server
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Database connection failed:", err.message);
//     process.exit(1); // Exit the app if the database connection fails
//   }
// }

// testDbConnection(); // Call the function to test DB connection