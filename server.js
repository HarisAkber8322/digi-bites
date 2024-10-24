// server.tsx
const express = require("express");
const next = require("next");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("./src/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail"); // SendGrid for email sending
require("dotenv").config(); // Load environment variables

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PAGE_SIZE = 5;

// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send email function using SendGrid
const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to, // recipient email address
    from: process.env.VERIFIED_EMAIL, // Your verified sender email from SendGrid
    subject,
    text,
    html,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());

  server.post("/send-email", async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
      await sendEmail(to, subject, text, html);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  });

  //User
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
      const favoriteproductIds = user.favoriteproductIds || [];
      // Check if the product ID is already in the favorites
      const isFavorite = favoriteproductIds.includes(productId);

      if (isFavorite) {
        // Remove the product ID from favorites
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { favoriteproductIds: productId } },
        );
      } else {
        // Add the product ID to favorites
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $addToSet: { favoriteproductIds: productId } },
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
  //User Auth
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
        expiresIn: "5h",
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
    const {
      fname = "",
      lname = "",
      email = "",
      password = "",
      contact_no = "",
      type = "customer",
      favoriteProductsIds = [],
    } = req.body;

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      // Check if the user already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with all the properties
      const newUser = {
        fname,
        lname,
        email,
        password: hashedPassword,
        contact_no,
        type,
        favoriteProductsIds,
      };

      // Insert the new user into the database
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

  // admin Auth
  server.get("/api/auth/admin/loggedinAdmin", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const db = await connectToDatabase();
      const adminCollection = db.collection("admin");
      const admin = await adminCollection.findOne({
        _id: new ObjectId(decoded.id),
      });

      if (admin) {
        res.status(200).json({ admin: { id: admin._id, email: admin.email } });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/auth/admin/login", async (req, res) => {
    console.log("Signup request received:", req.body);
    const { email, password } = req.body;

    try {
      const db = await connectToDatabase();
      const adminCollection = db.collection("admin");
      const admin = await adminCollection.findOne({ email });

      if (!admin) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password); // Fix here

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
        expiresIn: "5h",
      });

      res.status(200).json({
        token: token, // Include token in response
        admin: { id: admin._id, email: admin.email },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/auth/admin/signup", async (req, res) => {
    console.log("Signup request received:", req.body);
    const {
      username = "",
      email = "",
      password = "",
      role = "admin",
    } = req.body;

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("admin");

      // Check if the user already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with all the properties
      const newUser = {
        username,
        email,
        password: hashedPassword,
        role,
      };

      // Insert the new user into the database
      const result = await usersCollection.insertOne(newUser);

      if (result.acknowledged) {
        // Return user data or success message without JWT
        res.status(201).json({
          message: "Admin created successfully",
          admin: { id: result.insertedId, username, email },
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log("Error connecting to Gmail:", error);
    } else {
      console.log("Server is ready to send email", success);
    }
  });
  server.post("/api/auth/admin/forgot-password", async (req, res) => {
    const { email } = req.body;
    console.log("Received forgot password request for:", email);

    try {
      const db = await connectToDatabase();
      const adminCollection = db.collection("admin");
      const admin = await adminCollection.findOne({ email });

      if (!admin) {
        return res.status(404).json({ error: "Email not found" });
      }

      const otp = generateOTP();
      console.log("Generated OTP:", otp);

      const otpToken = jwt.sign(
        { otp, id: admin._id },
        process.env.SECRET_KEY,
        { expiresIn: "10m" },
      );
      console.log("Generated OTP token");

      // Send OTP to the admin's email
      await transporter.sendMail({
        to: email,
        subject: "Your OTP for Password Reset",
        text: `Your OTP is: ${otp}`,
      });

      res.status(200).json({ message: "OTP sent to email", otpToken });
    } catch (error) {
      console.error("Error in forgot-password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();
  server.post("/api/auth/admin/verify-otp", async (req, res) => {
    const { otpToken, otp } = req.body;

    try {
      const decoded = jwt.verify(otpToken, process.env.SECRET_KEY);

      if (decoded.otp !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error in verify-otp:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/auth/admin/reset-password", async (req, res) => {
    const { otpToken, newPassword } = req.body;

    try {
      const decoded = jwt.verify(otpToken, process.env.SECRET_KEY);
      const db = await connectToDatabase();
      const adminCollection = db.collection("admin");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await adminCollection.updateOne(
        { _id: new ObjectId(decoded.id) },
        { $set: { password: hashedPassword } },
      );

      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error in reset-password:", error);
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
          (id) => id !== productId,
        );
      } else {
        // Add the product ID to the array
        updatedFavorites = [...user.favoriteproductIds, productId];
      }

      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { favoriteproductIds: updatedFavorites } },
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
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
      }
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");
      const usersCollection = db.collection("users");

      // Fetch the product by ID
      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Fetch user details for each rating
      const ratingsWithUserDetails = await Promise.all(
        product.ratings.map(async (rating) => {
          try {
            const userId = rating.user_id; // Assuming user_id is a plain ObjectId

            // Check if userId is a valid ObjectId
            if (!ObjectId.isValid(userId)) {
              return { ...rating, user_id: "Invalid User ID" };
            }

            const user = await usersCollection.findOne({
              _id: new ObjectId(userId),
            });

            return {
              ...rating,
              user_id: user ? `${user.fname} ${user.lname}` : "Unknown User",
            };
          } catch (userError) {
            console.error(
              `Error fetching user for rating ${rating._id}:`,
              userError,
            );
            return { ...rating, user_id: "Unknown User" };
          }
        }),
      );

      res.status(200).json({ ...product, ratings: ratingsWithUserDetails });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/products", async (req, res) => {
    const { name, price, description, category, image, stock } = req.body;

    try {
      const db = await connectToDatabase();
      const product = {
        name,
        price,
        description,
        category,
        image,
        stock,
        created_at: new Date(),
        updated_at: new Date(),
        ratings: [],
      };
      await db.collection("products").insertOne(product);

      res.status(201).json(product);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");

      // Validate the ID format
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Product ID" });
      }

      // Attempt to delete the product by ID
      const result = await productsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        // No product found with the given ID
        return res.status(404).json({ error: "Product not found" });
      }

      // Successfully deleted
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.patch("/api/products/:id/recommended", async (req, res) => {
    const { id } = req.params;

    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");

      // Fetch the product by ID
      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Toggle the recommended status
      const updatedProduct = await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            recommended: !product.recommended,
            updated_at: new Date(), // Update the timestamp
          },
        },
        { returnOriginal: false }, // Return the updated document
      );

      res.status(200).json({
        message: "Product recommendation status updated",
        product: updatedProduct.value,
      });
    } catch (error) {
      console.error("Error updating product recommendation status:", error);
      res.status(500).json({
        message: "Error updating product recommendation status",
        error: error.message,
      });
    }
  });
  server.get("/api/products/slug/:slug", async (req, res) => {
    const { slug } = req.params;

    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("products");
      const usersCollection = db.collection("users");

      // Fetch the product by slug
      const product = await productsCollection.findOne({
        slug: slug.toLowerCase(),
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Fetch user details for each rating
      const ratingsWithUserDetails = await Promise.all(
        product.ratings.map(async (rating) => {
          try {
            const userId = rating.user_id; // Assuming user_id is a plain ObjectId

            // Check if userId is a valid ObjectId
            if (!ObjectId.isValid(userId)) {
              return { ...rating, user_id: "Invalid User ID" };
            }

            const user = await usersCollection.findOne({
              _id: new ObjectId(userId),
            });

            return {
              ...rating,
              user_id: user ? `${user.fname} ${user.lname}` : "Unknown User",
            };
          } catch (userError) {
            console.error(
              `Error fetching user for rating ${rating._id}:`,
              userError,
            );
            return { ...rating, user_id: "Unknown User" };
          }
        }),
      );

      res.status(200).json({ ...product, ratings: ratingsWithUserDetails });
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //Orders
  server.get("/api/orders", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const ordersCollection = db.collection("orders");

      const totalCount = await ordersCollection.countDocuments();
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);

      const orders = await ordersCollection.find().toArray();
      res.status(200).json({ orders, totalCount, totalPages });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.get("/api/orders/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const db = await connectToDatabase();
      const ordersCollection = db.collection("orders");

      const order = await ordersCollection.findOne({
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/orders", async (req, res) => {
    const {
      status = "pending",
      paymentMethod,
      products,
      addOns = [],
      totalAmount,
      userInfo,
      createdAt,
      updatedAt,
    } = req.body;

    try {
      const db = await connectToDatabase();
      const ordersCollection = db.collection("orders");

      // Create a new order object
      const newOrder = {
        status,
        paymentMethod,
        products,
        addOns,
        totalAmount,
        userInfo,
        createdAt: createdAt || new Date(),
        updatedAt: updatedAt || new Date(),
      };

      // Insert the new order into the collection
      const result = await ordersCollection.insertOne(newOrder);

      res.status(201).json({ _id: result.insertedId, ...newOrder });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.get("/api/orders/userInfo/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const db = await connectToDatabase();
      const ordersCollection = db.collection("orders");

      const orders = await ordersCollection
        .find({ "userInfo.userId": userId })
        .toArray();

      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const statusProgression = {
    Pending: "Confirmed",
    Confirmed: "Processing",
    Processing: "Readyforpickup",
    Readyforpickup: "Completed",
    Completed: "", // No next status
  };
  server.put("/api/orders/:orderId/update-status", async (req, res) => {
    const { orderId } = req.params;

    try {
      const db = await connectToDatabase();
      const ordersCollection = db.collection("orders");

      // Find the order by ID
      const order = await ordersCollection.findOne({
        _id: new ObjectId(orderId),
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Determine the next status
      const nextStatus = statusProgression[order.status];

      if (!nextStatus) {
        return res
          .status(400)
          .json({ error: "Order is already completed or in an invalid state" });
      }

      // Update the order status
      await ordersCollection.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status: nextStatus, updatedAt: new Date() } },
      );

      res
        .status(200)
        .json({ message: "Order status updated successfully", nextStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //Cart
  server.get("/api/cart", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const cartCollection = db.collection("cart");

      const totalCount = await cartCollection.countDocuments();
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);

      const cart = await cartCollection.find().toArray();
      // Send only the first cart item if available
      const firstCartItem = cart.length > 0 ? cart[0] : null;

      res.status(200).json({ firstCartItem, totalCount, totalPages });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/cart/:userId/add", async (req, res) => {
    try {
      const { userId } = req.params;
      const { product_id, quantity } = req.body;

      // Validate userId and product_id
      if (typeof userId !== "string" || typeof product_id !== "string") {
        return res.status(400).json({ error: "Invalid userId or product_id" });
      }

      const db = await connectToDatabase();
      const cartCollection = db.collection("cart");

      // Find existing cart or create a new one
      let cart = await cartCollection.findOne({ user_id: userId });
      if (!cart) {
        cart = {
          user_id: userId,
          items: [],
          total: 0,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }

      // Update cart items
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id === product_id,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ product_id, quantity });
      }

      // Calculate total
      cart.total = cart.items.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 0);
      }, 0);

      cart.updated_at = new Date();

      // Save cart
      await cartCollection.updateOne(
        { user_id: userId },
        {
          $set: {
            items: cart.items,
            total: cart.total,
            updated_at: cart.updated_at,
          },
        },
        { upsert: true },
      );

      res.status(200).json({ cart });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/cart/:userId/update-quantity", async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
      const db = await connectToDatabase();
      const cartCollection = db.collection("cart");

      const cart = await cartCollection.findOne({ user_id: userId });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      const item = cart.items.find(
        (item) => item.product_id.toString() === productId,
      );
      if (item) {
        item.quantity = quantity;
      }

      // Calculate total
      cart.total = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      cart.updated_at = new Date();

      await cartCollection.updateOne(
        { user_id: userId },
        {
          $set: {
            items: cart.items,
            total: cart.total,
            updated_at: cart.updated_at,
          },
        },
      );

      res.status(200).json({ cart });
    } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.delete("/api/cart/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const db = await connectToDatabase();
      const cartCollection = db.collection("cart");

      await cartCollection.deleteOne({ user_id: userId });

      res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  server.post("/api/cart/:userId/remove", async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId } = req.body;

      const db = await connectToDatabase();
      const cartCollection = db.collection("cart");

      // Remove the item from the user's cart
      const result = await cartCollection.updateOne(
        { user_id: userId },
        { $pull: { items: { product_id: productId } } },
      );

      if (result.modifiedCount > 0) {
        // Fetch the updated cart
        const cart = await cartCollection.findOne({ user_id: userId });

        if (cart) {
          // Calculate the total count
          const totalCount = cart.items.length;

          // Respond with the updated cart and total count
          res.status(200).json({ cart, totalCount });
        } else {
          res.status(404).json({ error: "Cart not found" });
        }
      } else {
        res
          .status(404)
          .json({ error: "Item not found in cart or cart does not exist" });
      }
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
