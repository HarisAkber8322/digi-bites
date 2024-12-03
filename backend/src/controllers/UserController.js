// const db = require("../config/db");
// // // Get all users
// const getUsers = async (req, res) => {
//   try {
//     // const result = await db.query("SELECT * FROM users");
//     //       console.log("Query result:", result.rows);  // Log the result here
//     //       res.status(200).json(result.rows);  // Send the result back
//     const [rows] = await db.query("SELECT * FROM users");
//     console.log("Query result:", rows);  // Log the result here
//     res.status(200).json(rows);  // Send the result back as JSON
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get user by ID
// // const getUserById = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "User not found" });
// //     }
// //     res.status(200).json(result.rows[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // Create a user
// // const createUser = async (req, res) => {
// //   try {
// //     const { fname, lname, email, password, contact_no } = req.body;
// //     const result = await db.query(
// //       "INSERT INTO users (fname, lname, email, password, contact_no) VALUES ($1, $2, $3, $4, $5) RETURNING *",
// //       [fname, lname, email, password, contact_no]
// //     );
// //     res.status(201).json(result.rows[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // Update a user
// // const updateUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { fname, lname, email, contact_no } = req.body;
// //     const result = await db.query(
// //       "UPDATE users SET fname = $1, lname = $2, email = $3, contact_no = $4 WHERE id = $5 RETURNING *",
// //       [fname, lname, email, contact_no, id]
// //     );
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "User not found" });
// //     }
// //     res.status(200).json(result.rows[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // Delete a user
// // const deleteUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "User not found" });
// //     }
// //     res.status(200).json({ message: "User deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// module.exports = {
//   getUsers,
//   //   getUserById,
//   //   createUser,
//   //   updateUser,
//   //   deleteUser,
// };








const userModel = require("../models/userModel");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a user
const createUser = async (req, res) => {
  try {
    const { fname, lname, email, password, contact_no } = req.body;
    const userId = await userModel.createUser(fname, lname, email, password, contact_no);
    res.status(201).json({ id: userId, fname, lname, email, contact_no });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, email, contact_no } = req.body;
    const rowsAffected = await userModel.updateUser(id, fname, lname, email, contact_no);
    if (rowsAffected === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsAffected = await userModel.deleteUser(id);
    if (rowsAffected === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};