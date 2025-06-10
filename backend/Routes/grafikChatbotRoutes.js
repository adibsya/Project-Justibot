const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT topic_name AS topik, COUNT(*) AS jumlah
        FROM chat_topics
        GROUP BY topic_name
        ORDER BY jumlah DESC
        LIMIT 10
      `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching topik populer:", err);
    res.status(500).json({ error: "Gagal mengambil data topik populer" });
  }
});

module.exports = router;