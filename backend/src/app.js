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
