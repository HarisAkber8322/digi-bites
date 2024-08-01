// server.tsx
const express = require("express");
const next = require("next");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("./src/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PAGE_SIZE = 5;

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  server.get("/api/users", async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const searchQuery = req.query.q || "";
    const sortOrder = req.query.sort || "asc";

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const totalCount = await usersCollection.countDocuments();
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);

      const skip = (page - 1) * PAGE_SIZE;

      const users = await usersCollection
        .find({ fname: { $regex: new RegExp(searchQuery, "i") } }) // Case-insensitive search
        .sort({ fname: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray();

      res.status(200).json({ users, totalCount, totalPages });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.get("/api/users/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const user = await usersCollection.findOne({
        _id: new ObjectId(req.params.id),
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // server.post("/api/users", async (req, res) => {
  //   try {
  //     const { name, fname, role, phoneNumber } = req.body;

  //     if (!name || !fname || !role || !phoneNumber) {
  //       return res.status(400).json({ error: "All fields are required" });
  //     }

  //     const db = await connectToDatabase();
  //     const usersCollection = db.collection("users");

  //     const newUser = {
  //       name,
  //       fname,
  //       role,
  //       phoneNumber,
  //     };

  //     const result = await usersCollection.insertOne(newUser);

  //     if (result && result.acknowledged) {
  //       const insertedId = result.insertedId.toString();
  //       res.status(201).json({
  //         message: "User added successfully",
  //         user: { ...newUser, _id: insertedId },
  //       });
  //     } else {
  //       console.error(
  //         "Error adding user: Insert operation did not return the expected result",
  //         result
  //       );
  //       res.status(500).json({ error: "Internal server error" });
  //     }
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //     if (error.code === 11000) {
  //       return res
  //         .status(400)
  //         .json({ error: "User with the same data already exists" });
  //     }

  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });

  server.delete("/api/users/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const result = await usersCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(204).end();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.put("/api/users/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const userId = new ObjectId(req.params.id);

      // Extract the _id field from the update data
      const { _id, ...updateData } = req.body;

      const result = await usersCollection.updateOne(
        { _id: userId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.post("/api/auth/signup", async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        fname,
        lname,
        email,
        password: hashedPassword
      };

      const result = await usersCollection.insertOne(newUser);

      if (result.acknowledged) {
        const token = jwt.sign({ id: result.insertedId }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(201).json({ token });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


//Products
server.get("/api/products", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const searchQuery = req.query.q || "";
  const sortOrder = req.query.sort || "asc";

  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection("products");

    const totalCount = await productsCollection.countDocuments();
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const skip = (page - 1) * PAGE_SIZE;

    const products = await productsCollection
      .find({ fname: { $regex: new RegExp(searchQuery, "i") } }) // Case-insensitive search
      .sort({ fname: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();

    res.status(200).json({ products, totalCount, totalPages });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


server.get("/api/orders", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const searchQuery = req.query.q || "";
  const sortOrder = req.query.sort || "asc";

  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");

    const totalCount = await ordersCollection.countDocuments();
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const skip = (page - 1) * PAGE_SIZE;

    const orders = await ordersCollection
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();
    res.status(200).json({ orders, totalCount, totalPages });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
