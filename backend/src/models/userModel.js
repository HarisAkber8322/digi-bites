const db = require("../config/db");

// Fetch all users
const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

// Fetch a user by ID
const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

// Create a new user
const createUser = async (fname, lname, email, password, contact_no) => {
  const [result] = await db.query(
    "INSERT INTO users (fname, lname, email, password, contact_no) VALUES (?, ?, ?, ?, ?)",
    [fname, lname, email, password, contact_no]
  );
  return result.insertId;
};

// Update a user by ID
const updateUser = async (id, fname, lname, email, contact_no) => {
  const [result] = await db.query(
    "UPDATE users SET fname = ?, lname = ?, email = ?, contact_no = ? WHERE id = ?",
    [fname, lname, email, contact_no, id]
  );
  return result.affectedRows;
};

// Delete a user by ID
const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
