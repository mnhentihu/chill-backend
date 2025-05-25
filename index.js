require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Database connection test
require("./config/connection");

// Custom response (optional)
const response = require("./config/response");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get("/", (req, res) => {
  response(200, null, "Welcome to Chill Movies API", res);
});

// User Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Movies Routes
const contentRoutes = require("./routes/contentRoutes");
const genreRoutes = require("./routes/genreRoutes");
app.use("/api/content", contentRoutes);
app.use("/api/genres", genreRoutes);

// Upload Service
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

// Allow access to uploaded files
app.use("/uploads", express.static("uploads"));

// Error fallback
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start server
app.listen(port, () => {
  console.log(`App Server running on http://localhost:${port}`);
});
