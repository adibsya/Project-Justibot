const express = require("express");
const pool = require("../db"); // konfigurasi pool PostgreSQL
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// ====================== GET ALL ARTICLES ======================
router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    const result = await pool.query('SELECT * FROM artikell ORDER BY created_at DESC');

    const articles = result.rows.map(article => {
      if (article.image_url && Buffer.isBuffer(article.image_url)) {
        article.image_url = `data:image/jpeg;base64,${article.image_url.toString('base64')}`;
      }
      return article;
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data artikel' });
  }
});

// ====================== GET RECOMMENDATIONS WITH PAGINATION ======================
router.get('/recommendations', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  try {
    const dataQuery = await pool.query(
      'SELECT * FROM artikell ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const countQuery = await pool.query('SELECT COUNT(*) FROM artikell');

    const total = parseInt(countQuery.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);

    const articles = dataQuery.rows.map(article => {
      if (article.image_url && Buffer.isBuffer(article.image_url)) {
        article.image_url = `data:image/jpeg;base64,${article.image_url.toString('base64')}`;
      }
      return article;
    });

    res.json({
      articles,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Gagal mengambil rekomendasi artikel' });
  }
});

// ====================== GET ALL CATEGORIES ======================
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kategori_artikel ORDER BY nama_kategori ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Gagal mengambil kategori:', error);
    res.status(500).json({ error: 'Gagal mengambil kategori' });
  }
});

// ====================== CREATE ARTICLE ======================
router.post('/', upload.single('image_url'), async (req, res) => {
  let { title, content, author, kategori_id } = req.body;

  if (!title || !content || !author || !kategori_id) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  // Jangan hapus tag HTML supaya format tetap tersimpan
  // content = striptags(content);

  const image_url = req.file ? req.file.buffer : null;

  try {
    const result = await pool.query(
      'INSERT INTO artikell (title, content, author, image_url, kategori_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, content, author, image_url, kategori_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menambahkan artikel' });
  }
});

// ====================== CHECK DUPLICATE TITLE ======================
router.get('/check-title', async (req, res) => {
  const { judul } = req.query;

  if (!judul) {
    return res.status(400).json({ error: "Query 'judul' wajib diisi" });
  }

  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM artikell WHERE LOWER(title) = LOWER($1)',
      [judul]
    );
    const count = parseInt(result.rows[0].count, 10);
    res.json({ exists: count > 0 });
  } catch (error) {
    console.error('Gagal cek judul artikel:', error);
    res.status(500).json({ error: 'Gagal cek judul artikel' });
  }
});

// ====================== UPDATE ARTICLE ======================
router.put('/:id', upload.single('image_url'), async (req, res) => {
  const { id } = req.params;
  let { title, content, author, kategori_id } = req.body;
  const image_url = req.file ? req.file.buffer : null;

  // Jangan hapus tag HTML supaya format tetap tersimpan
  // if (content) content = striptags(content);

  const fieldsToUpdate = [];
  const values = [];
  let index = 1;

  if (title) {
    fieldsToUpdate.push(`title = $${index++}`);
    values.push(title);
  }
  if (content) {
    fieldsToUpdate.push(`content = $${index++}`);
    values.push(content);
  }
  if (author) {
    fieldsToUpdate.push(`author = $${index++}`);
    values.push(author);
  }
  if (kategori_id) {
    fieldsToUpdate.push(`kategori_id = $${index++}`);
    values.push(kategori_id);
  }
  if (image_url) {
    fieldsToUpdate.push(`image_url = $${index++}`);
    values.push(image_url);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ error: 'Tidak ada data yang diperbarui' });
  }

  const query = `UPDATE artikell SET ${fieldsToUpdate.join(', ')} WHERE id = $${index} RETURNING *`;
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

// ====================== DELETE ARTICLE ======================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM artikell WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }
    res.json({ message: 'Artikel berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus artikel' });
  }
});

// ====================== GET ARTICLE DETAIL ======================
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM artikell WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }

    const article = result.rows[0];
    if (article.image_url && Buffer.isBuffer(article.image_url)) {
      article.image_url = `data:image/jpeg;base64,${article.image_url.toString('base64')}`;
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil artikel' });
  }
});

module.exports = router;
