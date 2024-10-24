import { connectToDatabase } from "../../../db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();
    const adminCollection = db.collection("admin");
    const admin = await adminCollection.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token and send it as response
    // Example: const token = generateToken(user);
    // res.status(200).json({ token });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
