const express = require("express");
const axios = require("axios");
const router = express.Router();

// Debug environment variables
console.log("GROQ_API_KEY loaded:", !!process.env.GROQ_API_KEY);

// In Node.js backend, we don't use VITE_ prefix for environment variables
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Add a simple test route
router.get("/test", (req, res) => {
  res.json({
    message: "Chatbot routes working!",
    apiKeyConfigured: !!GROQ_API_KEY,
  });
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  // Log request for debugging
  console.log("Received message:", message);

  try {
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "Anda adalah asisten hukum pintar yang membantu masyarakat memahami hukum di Indonesia.",
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    console.log("GROQ API response received successfully");
    res.json({ response: botResponse });
  } catch (error) {
    console.error(
      "Groq API Error:",
      error.response?.data || error.message || error
    );
    res.status(500).json({
      error: "Terjadi kesalahan saat menghubungi Groq",
      detail: error.response?.data || error.message,
    });
  }
});

module.exports = router;
