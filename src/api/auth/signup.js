import { connectToDatabase } from "../../db";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { fname, lname, email, password, contact_no, type, social_links } = req.body;

  if (!fname || !lname || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      fname,
      lname,
      email,
      password: hashedPassword,
      contact_no: contact_no || '',
      type: type || 'user',
      social_links: social_links || []
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
