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
    // Add cases for other HTTP methods (PUT, DELETE) as needed
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
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    // Extract user data from req.body and insert into the database
    // Example: const newUser = await usersCollection.insertOne(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
