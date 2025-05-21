const express = require ('express');
const pool = require ('../db');

const router = express.Router();

// Daftar ide artikel
router.get ('/', async (req,res) => {
    try {
        const result = await pool.query ('SELECT * FROM artikel_feedback ORDER BY id ASC');
        if (result.rows.length === 0) {
            return res.status (404).json ({ message: 'Belum ada ide artikel yang ditambahkan' });
        }
        res.json (result.rows);
    } catch (error) {
        console.error (error);
        res.status (500).json ({ error: 'Gagal mengambil data feedback' });
    }
});

// Detail ide artikel berdasarkan ID
router.get ('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const result = await pool.query ('SELECT * FROM artikel_feedback WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status (404).json ({ error: 'Ide artikel tidak ditemukan' });
        }
        res.json (result.rows[0]);
    } catch (error) {
        console.error (error);
        res.status (500).json ({ error: 'Gagal mengambil ide artikel' });
    }
});

// Tambah ide artikel
router.post('/', async (req, res) => {
    const { nama_user, email, judul_artikel, deskripsi_artikel } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Format email tidak valid' });
    };

    try {
        const result = await pool.query(
            'INSERT INTO artikel_feedback (nama_user, email, judul_artikel, deskripsi_artikel) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama_user, email, judul_artikel, deskripsi_artikel]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menambahkan ide artikel' });
    };
});

// Perbarui ide artikel
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM artikel_feedback WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ide artikel tidak ditemukan' });
        };
        res.json({ message: 'Ide artikel berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus ide artikel' });
    };
});

module.exports = router;