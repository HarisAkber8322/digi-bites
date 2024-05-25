// src/db.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error(
    "MongoDB connection string is missing. Please check your .env file.",
  );
}
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let cachedDb = null as any; // Explicitly specify the type as 'any'
exports.connectToDatabase = async function () {
  if (cachedDb && client.isConnected) {
    return cachedDb;
  }
  try {
    await client.connect();
    const db = client.db();
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
