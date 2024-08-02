// pages/api/users.js
import { connectToDatabase } from "../db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      await getOrders(req, res);
      break;
    case "POST":
      await createOrder(req, res);
      break;
    // Add cases for other HTTP methods (PUT, DELETE) as needed
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

async function getOrders(req, res) {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");
    const orders = await ordersCollection.find().toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createOrder(req, res) {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");
    // Extract user data from req.body and insert into the database
    // Example: const newUser = await usersCollection.insertOne(req.body);
    res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
