const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const authRoutes = require("./Routes/authRoutes");
const articlesRoutes = require("./Routes/articlesRoutes");
const lawyerRoutes = require("./Routes/lawyerRoutes");
const chatbotRoutes = require("./Routes/chatbotRoutes");
const adminRoutes = require("./Routes/adminRoutes");  
const articlesFeedbackRoutes = require("./Routes/articlesFeedbackRoutes");
const grafikArtikelRoutes = require("./Routes/grafikArtikelRoutes");
const feedbackRoutes = require("./Routes/feedbackRoutes");
const grafikPuasRoutes = require("./Routes/grafikPuasRoutes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// Log environment variables at startup (redact sensitive info)
console.log("Environment check on startup:");
console.log("- NODE_ENV:", process.env.NODE_ENV);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // GANTI sesuai URL frontend kamu
    credentials: true, // HARUS true jika pakai cookie
  })
);
app.use(express.json());
app.use(cookieParser());

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
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/articles-feedback", articlesFeedbackRoutes);
app.use("/api/grafik-artikel", grafikArtikelRoutes);
app.use("/api/grafik-puas", grafikPuasRoutes)

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
