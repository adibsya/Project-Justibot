const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const authRoutes = require("./Routes/authRoutes");
const articlesRoutes = require("./Routes/articlesRoutes");
const lawyerRoutes = require("./Routes/lawyerRoutes");
const chatbotRoutes = require("./Routes/chatbotRoutes");

require("dotenv").config();

// Log environment variables at startup (redact sensitive info)
console.log("Environment check on startup:");
console.log("- NODE_ENV:", process.env.NODE_ENV);

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use("/api", authRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
