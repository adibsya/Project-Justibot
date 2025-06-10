const express = require("express");
const axios = require("axios");
const router = express.Router();
const pool = require("../db"); // pastikan file koneksi db ada

console.log("CHATBOT_API_KEY loaded:", !!process.env.CHATBOT_API_KEY);

const CHATBOT_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const CHATBOT_API_KEY = process.env.CHATBOT_API_KEY;

// Fungsi deteksi topik sederhana
function deteksiTopik(pesan) {
  const topikKeywords = {
    Agama: ["agama", "islam", "kristen", "hukum syariah"],
    Pernikahan: ["nikah", "cerai", "perceraian", "pernikahan"],
    Pidana: ["pasal", "pencurian", "penipuan", "pidana"],
    Warisan: ["waris", "ahli waris", "harta warisan"],
    HAK: ["hak cipta", "paten", "merek dagang", "haki"]
  };

  const hasil = [];
  for (const [topik, kataList] of Object.entries(topikKeywords)) {
    if (kataList.some(kata => pesan.toLowerCase().includes(kata))) {
      hasil.push(topik);
    }
  }

  return hasil;
}

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  console.log("CHATBOT received message:", message);

  try {
    if (!CHATBOT_API_KEY) {
      throw new Error("CHATBOT_API_KEY is not configured");
    }

    // 1. Simpan pesan ke chat_logs
    const chatLog = await pool.query(
      "INSERT INTO chat_logs (message) VALUES ($1) RETURNING id",
      [message]
    );
    const chatId = chatLog.rows[0].id;

    // 2. Deteksi topik dan simpan
    const topikTerdeteksi = deteksiTopik(message);
    for (const topik of topikTerdeteksi) {
      await pool.query(
        "INSERT INTO chat_topics (chat_log_id, topic_name) VALUES ($1, $2)",
        [chatId, topik]
      );
    }

    // 3. Kirim ke OpenRouter56
    const response = await axios.post(
      CHATBOT_API_URL,
      {
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
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
          "HTTP-Referer": "https://justibot.id",
          "X-Title": "CHATBOT",
          "Content-Type": "application/json",
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    console.log("CHATBOT response received successfully");
    res.json({ response: botResponse });
  } catch (error) {
    console.error("CHATBOT Error:", error.response?.data || error.message || error);

    let userMessage = "Maaf, terjadi kesalahan pada sistem. Silakan coba lagi.";
    let statusCode = 500;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          userMessage = "Masalah autentikasi sistem. Silakan coba lagi nanti.";
          statusCode = 503;
          break;
        case 403:
          userMessage = "Layanan tidak tersedia sementara. Silakan coba lagi nanti.";
          statusCode = 503;
          break;
        case 429:
          userMessage = "Sistem sedang sibuk. Silakan coba lagi sebentar.";
          statusCode = 429;
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          userMessage = "Layanan chatbot sedang gangguan. Coba lagi nanti.";
          statusCode = 503;
          break;
        default:
          userMessage = "Kesalahan saat memproses permintaan. Coba lagi.";
      }
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      userMessage = "Tidak dapat terhubung ke layanan. Periksa koneksi Anda.";
      statusCode = 503;
    } else if (error.message === "CHATBOT_API_KEY is not configured") {
      userMessage = "Layanan sedang dalam pemeliharaan.";
      statusCode = 503;
    }

    res.status(statusCode).json({
      error: userMessage,
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;
