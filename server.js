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

  server.get("/api/auth/loggedinUser", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const user = await usersCollection.findOne({
        _id: new ObjectId(decoded.id),
      });
      // const user = await usersCollection.findOne({ _id: decoded.id });

      if (user) {
        res.status(200).json({ user: { id: user._id, email: user.email } });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({
        token: token, // Include token in response
        user: { id: user._id, email: user.email },
      });
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
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        fname,
        lname,
        email,
        password: hashedPassword,
      };

      const result = await usersCollection.insertOne(newUser);

      if (result.acknowledged) {
        // Return user data or success message without JWT
        res.status(201).json({
          message: "User created successfully",
          user: { id: result.insertedId, fname, lname, email },
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //Products
  server.post("/api/products/:id/favorite", async (req, res) => {
    const { userId } = req.body; // Assuming userId is passed in the request body
    const productId = req.params.id;

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isFavorite = user.favoriteproductIds.includes(productId);

      let updatedFavorites;
      if (isFavorite) {
        // Remove the product ID from the array
        updatedFavorites = user.favoriteproductIds.filter(
          (id) => id !== productId
        );
      } else {
        // Add the product ID to the array
        updatedFavorites = [...user.favoriteproductIds, productId];
      }

      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { favoriteproductIds: updatedFavorites } }
      );

      return res.status(200).json({
        message: "Favorite status updated successfully",
        favoriteproductIds: updatedFavorites,
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  server.get("/api/products", async (req, res) => {
    const searchQuery = req.query.q || "";
    const sortOrder = req.query.sort || "asc";

    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");
      const totalCount = await productsCollection.countDocuments();
      const products = await productsCollection
        .find({
          $or: [
            { name: { $regex: new RegExp(searchQuery, "i") } },
            { category: { $regex: new RegExp(searchQuery, "i") } },
          ],
        })
        .sort({ name: sortOrder === "asc" ? 1 : -1 })
        .toArray();

      res.status(200).json({ products, totalCount });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const db = await connectToDatabase(); // Function to connect to your database
      const productsCollection = db.collection("products");

      // Find the product by ID
      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Return the product data
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.post("/api/products/:id/favorite", async (req, res) => {
    const userId = req.body.userId; // Assuming userId is passed in the request body
    const productId = req.params.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the product is already in the favorites array
      const isFavorite = user.favoriteproductIds.includes(productId);

      if (isFavorite) {
        // Remove the product ID from the array
        user.favoriteproductIds = user.favoriteproductIds.filter(
          (id) => id !== productId
        );
      } else {
        // Add the product ID to the array
        user.favoriteproductIds.push(productId);
      }

      // Save the user document
      await user.save();

      return res.status(200).json({
        message: "Favorite status updated successfully",
        favoriteproductIds: user.favoriteproductIds,
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  server.post("/api/products/:id/reviews", async (req, res) => {
    const { id } = req.params;
    const { user_id, rating, review } = req.body;

    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");

      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Add review
      const newReview = { user_id, rating, review };
      await productsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { reviews: newReview } }
      );

      // Update average rating and rating count
      const totalRatings =
        product.reviews.reduce((sum, r) => sum + r.rating, 0) + rating;
      const averageRating = (
        totalRatings /
        (product.reviews.length + 1)
      ).toFixed(2);

      await productsCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            average_rating: averageRating,
            ratings_count: product.reviews.length + 1,
          },
        }
      );

      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.put("/api/products/:id/ratings", async (req, res) => {
    const { id } = req.params;
    const { user_id, rating } = req.body;

    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");

      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const existingRating = product.reviews.find((r) => r.user_id === user_id);
      if (existingRating) {
        // Update existing rating
        await productsCollection.updateOne(
          { _id: new ObjectId(id), "reviews.user_id": user_id },
          { $set: { "reviews.$.rating": rating } }
        );
      } else {
        // Add new rating
        await productsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $push: { reviews: { user_id, rating, review: "" } } }
        );
      }

      // Recalculate average rating
      const totalRatings = product.reviews.reduce(
        (sum, r) => sum + r.rating,
        0
      );
      const averageRating = (totalRatings / product.reviews.length).toFixed(2);

      await productsCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            average_rating: averageRating,
          },
        }
      );

      res.status(200).json({ message: "Rating updated successfully" });
    } catch (error) {
      console.error("Error updating rating:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //Orders
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

  server.post("/api/users/:id/favoritestoggle", async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      // Find the user
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the product ID is already in the favorites
      const isFavorite = user.favoriteproductIds.includes(productId);

      if (isFavorite) {
        // Remove the product ID from favorites
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { favoriteproductIds: productId } }
        );
      } else {
        // Add the product ID to favorites
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $addToSet: { favoriteproductIds: productId } }
        );
      }

      return res.status(200).json({ message: "Favorite status updated" });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  server.get("/api/users/:id/favorites", async (req, res) => {
    const userId = req.params.id;

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      // Find the user
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the array of product IDs from user's favoriteproductIds
      return res.status(200).json(user.favoriteproductIds);
    } catch (error) {
      console.error("Error fetching favorite product IDs:", error);
      return res.status(500).json({ message: "Internal server error" });
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
