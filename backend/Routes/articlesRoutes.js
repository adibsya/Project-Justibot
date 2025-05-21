const express = require("express");
const pool = require("../db");
const { parse } = require("dotenv");
const router = express.Router();

// Daftar artikel
router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    let query = 'SELECT * FROM articles';
    let values = [];

    if (category) {
      query += ' WHERE category = $1';
      values.push(category);
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, values);
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

// Tambah artikel
router.post('/', async (req, res) => {
  const { title, content, author, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO articles (title, content, author, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, author, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menambahkan artikel' });
  }
});

// Perbarui artikel
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author, image_url } = req.body;
  const fieldsToUpdate = [];
  const values = [];
  let fieldIndex = 1;

  if (title) {
    fieldsToUpdate.push(`title = $${fieldIndex++}`);
    values.push(title);
  }
  if (content) {
    fieldsToUpdate.push(`content = $${fieldIndex++}`);
    values.push(content);
  }
  if (author) {
    fieldsToUpdate.push(`author = $${fieldIndex++}`);
    values.push(author);
  }
  if (image_url) {
    fieldsToUpdate.push(`image_url = $${fieldIndex++}`);
    values.push(image_url);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ error: 'Tidak ada data yang diperbarui' });
  }

  const query = `
    UPDATE articles 
    SET ${fieldsToUpdate.join(', ')} 
    WHERE id = $${fieldIndex} 
    RETURNING *`;
  
  values.push(id);

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui artikel' });
  }
});

// Hapus artikel
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }
    res.json({ message: 'Artikel berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus artikel' });
  }
});

module.exports = router;