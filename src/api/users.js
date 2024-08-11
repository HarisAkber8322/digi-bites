// pages/api/users.js
import { connectToDatabase } from "../../src/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      await getUsers(req, res);
      break;
    case "POST":
      await createUser(req, res);
      break;
    case "PUT":
      await updateUser(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

async function getUsers(req, res) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find().toArray();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const newUser = req.body;
    
    if (!newUser || !newUser.email || !newUser.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User created successfully", user: result.ops[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const { id } = req.query; // Assume ID is passed as a query parameter
    const updates = req.body;

    if (!id || !updates) {
      return res.status(400).json({ error: "Missing ID or update data" });
    }

    const result = await usersCollection.updateOne({ _id: id }, { $set: updates });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const { id } = req.query; // Assume ID is passed as a query parameter

    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    const result = await usersCollection.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
