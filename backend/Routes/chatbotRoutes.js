const express = require("express");
const axios = require("axios");
const router = express.Router();

// Tetap menggunakan nama yang sama untuk konsistensi
console.log("CHATBOT_API_KEY loaded:", !!process.env.CHATBOT_API_KEY);

// Ubah URL ke OpenRouter
const CHATBOT_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const CHATBOT_API_KEY = process.env.CHATBOT_API_KEY;

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  // Log request for debugging
  console.log("CHATBOT received message:", message);

  try {
    if (!CHATBOT_API_KEY) {
      throw new Error("CHATBOT_API_KEY is not configured");
    }

    const response = await axios.post(
      CHATBOT_API_URL,
      {
        model: "openai/gpt-4.1", // Format model untuk OpenRouter
        messages: [
          {
            role: "system",
            content:
              "Anda adalah asisten hukum pintar yang membantu masyarakat memahami hukum di Indonesia. Anda harus memberikan jawaban yang akurat dan relevan berdasarkan hukum yang berlaku di Indonesia. Jika Anda tidak tahu jawabannya, katakan 'Saya tidak tahu' dan jangan memberikan informasi yang salah. Berikan disclaimer di awal chat bahwa chatbot ini di khususkan untuk memberikan informasi hukum dan bukan sebagai pengganti nasihat hukum profesional. Anda tidak boleh memberikan saran hukum yang spesifik atau pribadi. Jika ada pertanyaan yang bersifat pribadi atau spesifik, sarankan untuk berkonsultasi dengan pengacara atau profesional hukum yang berlisensi. disclaimer hanya disebutkan saat chat pertama, dan untuk chat selanjutnya tidak perlu disclaimer",
          },
          { role: "user", content: message },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${CHATBOT_API_KEY}`,
          "HTTP-Referer": "https://justibot.id", // Ganti dengan domain Anda
          "X-Title": "CHATBOT",
          "Content-Type": "application/json",
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    console.log("CHATBOT response received successfully");
    res.json({ response: botResponse });
  } catch (error) {
    console.error(
      "CHATBOT Error:",
      error.response?.data || error.message || error
    );

    // Determine user-friendly error message
    let userMessage = "Maaf, terjadi kesalahan pada sistem. Silakan coba lagi.";
    let statusCode = 500;

    if (error.response) {
      // HTTP error responses
      switch (error.response.status) {
        case 401:
          userMessage =
            "Maaf, terjadi masalah autentikasi sistem. Silakan coba lagi nanti.";
          statusCode = 503;
          break;
        case 403:
          userMessage =
            "Maaf, layanan sementara tidak tersedia. Silakan coba lagi nanti.";
          statusCode = 503;
          break;
        case 429:
          userMessage =
            "Sistem sedang sibuk. Silakan tunggu beberapa saat dan coba lagi.";
          statusCode = 429;
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          userMessage =
            "Layanan chatbot sementara tidak tersedia. Silakan coba lagi nanti.";
          statusCode = 503;
          break;
        default:
          userMessage =
            "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.";
      }
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      userMessage =
        "Maaf, tidak dapat terhubung ke layanan chatbot. Silakan periksa koneksi internet Anda.";
      statusCode = 503;
    } else if (error.message === "CHATBOT_API_KEY is not configured") {
      userMessage =
        "Layanan chatbot sedang dalam pemeliharaan. Silakan coba lagi nanti.";
      statusCode = 503;
    }

    res.status(statusCode).json({
      error: userMessage,
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;
