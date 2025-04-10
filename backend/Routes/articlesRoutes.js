const express = require("express");
const pool = require("../db");
const { parse } = require("dotenv");
const router = express.Router();

// Daftar artikel
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data artikel' });
  }
});

// Rekomendasi artikel
router.get('/recommendations', async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;

    const offset = (page - 1) * limit;

    try {
        console.log(`Executing query: SELECT id, title, content, author, image_url, created_at, date FROM articles ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
        const dataQuery = await pool.query('SELECT id, title, content, author, image_url, created_at, date FROM articles ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);

        const countQuery = await pool.query('SELECT COUNT(*) FROM articles');
        const total = parseInt(countQuery.rows[0].count, 10);
        const totalPages = Math.ceil(total / limit);

        res.json({
            articles: dataQuery.rows,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({
            error: 'Gagal mengambil rekomendasi artikel',
            details: error.message,
        });
    }
});

// Detail artikel berdasarkan ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil artikel' });
  }
});

module.exports = router;