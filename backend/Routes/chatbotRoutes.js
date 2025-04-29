const express = require("express");
const axios = require("axios");
const router = express.Router();

// Tetap menggunakan nama yang sama untuk konsistensi
console.log(
  "JUSTIBOT_DEEPSEEK_R1_API_KEY loaded:",
  !!process.env.JUSTIBOT_DEEPSEEK_R1_API_KEY
);

// Ubah URL ke OpenRouter
const JUSTIBOT_DEEPSEEK_R1_API_URL =
  "https://openrouter.ai/api/v1/chat/completions";
const JUSTIBOT_DEEPSEEK_R1_API_KEY = process.env.JUSTIBOT_DEEPSEEK_R1_API_KEY;

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  // Log request for debugging
  console.log("JUSTIBOT_DEEPSEEK_R1 received message:", message);

  try {
    if (!JUSTIBOT_DEEPSEEK_R1_API_KEY) {
      throw new Error("JUSTIBOT_DEEPSEEK_R1_API_KEY is not configured");
    }

    const response = await axios.post(
      JUSTIBOT_DEEPSEEK_R1_API_URL,
      {
        model: "deepseek/deepseek-r1:free", // Format model untuk OpenRouter
        messages: [
          {
            role: "system",
            content:
              "Anda adalah asisten hukum pintar yang membantu masyarakat memahami hukum di Indonesia.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${JUSTIBOT_DEEPSEEK_R1_API_KEY}`,
          "HTTP-Referer": "https://justibot.id", // Ganti dengan domain Anda
          "X-Title": "JUSTIBOT_DEEPSEEK_R1",
          "Content-Type": "application/json",
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    console.log("JUSTIBOT_DEEPSEEK_R1 response received successfully");
    res.json({ response: botResponse });
  } catch (error) {
    console.error(
      "JUSTIBOT_DEEPSEEK_R1 Error:",
      error.response?.data || error.message || error
    );
    res.status(500).json({
      error: "Terjadi kesalahan saat menghubungi JUSTIBOT_DEEPSEEK_R1",
      detail: error.response?.data || error.message,
    });
  }
});

module.exports = router;
