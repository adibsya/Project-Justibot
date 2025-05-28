const express = require('express');
const pool = require('../db');
const authenticate = require('../Middleware/authenticate'); // pastikan sudah ada middleware ini

const router = express.Router();

// GET semua feedback (misal untuk admin)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback ORDER BY id ASC');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Belum ada feedback yang ditambahkan' });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data feedback' });
  }
});

// POST feedback baru, hanya untuk user yang sudah login (perlu authenticate)
router.post('/', authenticate, async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    if (!feedback || feedback.trim() === '') {
      return res.status(400).json({ error: 'Feedback tidak boleh kosong.' });
    }

    const { name, email } = req.user;

    if (typeof rating !== 'undefined' && (isNaN(rating) || rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating harus berupa angka antara 1 sampai 5.' });
    }

    const result = await pool.query(
      'INSERT INTO feedback (name, email, rating, feedback) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, rating || null, feedback.trim()]
    );

    res.status(201).json({
      message: 'Feedback berhasil dikirim.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Gagal menambahkan feedback:', error);
    res.status(500).json({ error: 'Gagal menambahkan feedback.' });
  }
});

module.exports = router;
