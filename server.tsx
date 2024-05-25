// server.js
const express = require("express");
const next = require("next");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("./src/db");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());
  const PAGE_SIZE = 5;
  server.get("/api/users", async (req: { query: { page: string; q: string; sort: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { users?: any; totalCount?: any; totalPages?: number; error?: string; }): void; new(): any; }; }; }) => {
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
        .find({ name: { $regex: new RegExp(searchQuery, "i") } }) // Case-insensitive search
        .sort({ name: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray();

      res.status(200).json({ users, totalCount, totalPages });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // server.get("/api/users", async (req, res) => {
  //   try {
  //     const page = parseInt(req.query.page, 10) || 1;

  //     const db = await connectToDatabase();
  //     const usersCollection = db.collection("users");

  //     const totalCount = await usersCollection.countDocuments();
  //     const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  //     const skip = (page - 1) * PAGE_SIZE;

  //     const users = await usersCollection
  //       .find()
  //       .sort({ name: 1 })
  //       .skip(skip)
  //       .limit(PAGE_SIZE)
  //       .toArray();

  //     res.status(200).json({ users, totalCount, totalPages });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });
  server.get("/api/users/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
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
  server.post("/api/users", async (req: { body: { name: any; fname: any; role: any; phoneNumber: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; user?: { _id: any; name: any; fname: any; role: any; phoneNumber: any; }; }): void; new(): any; }; }; }) => {
    try {
      const { name, fname, role, phoneNumber } = req.body;

      if (!name || !fname || !role || !phoneNumber) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const newUser = {
        name,
        fname,
        role,
        phoneNumber,
      };

      const result = await usersCollection.insertOne(newUser);

      if (result && result.acknowledged) {
        const insertedId = result.insertedId.toString();
        res.status(201).json({
          message: "User added successfully",
          user: { ...newUser, _id: insertedId },
        });
      } else {
        console.error(
          "Error adding user: Insert operation did not return the expected result",
          result,
        );
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error: any) {
      console.error("Error adding user:", error);
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: "User with the same data already exists" });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.delete("/api/users/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; end: { (): void; new(): any; }; }; }) => {
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
  server.put("/api/users/:id", async (req: { params: { id: any; }; body: { [x: string]: any; _id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) => {
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const userId = new ObjectId(req.params.id);

      // Extract the _id field from the update data
      const { _id, ...updateData } = req.body;

      const result = await usersCollection.updateOne(
        { _id: userId },
        { $set: updateData },
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
  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, (err: any) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
