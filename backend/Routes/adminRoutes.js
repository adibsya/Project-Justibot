const express = require('express');
const pool = require('../db');

const router = express.Router();

// Daftar admin
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin ORDER BY id ASC');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Belum ada admin yang ditambahkan' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data admin' });
    }
});

// Detail admin berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM admin WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Admin tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data admin' });
    }
});

// Tambah admin
router.post('/', async (req, res) => {
    const {name, email, password} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Format email tidak valid' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menambahkan admin' });
    }
});

// Perbarui admin
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const fieldsToUpdate = [];
    const values = [];
    let fieldIndex = 1;

    if (name) {
        fieldsToUpdate.push(`name = $${fieldIndex++}`);
        values.push(name);
    }
    if (email) {
        fieldsToUpdate.push(`email = $${fieldIndex++}`);
        values.push(email);
    }
    if (password) {
        fieldsToUpdate.push(`password = $${fieldIndex++}`);
        values.push(password);
    }

    if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ error: 'Tidak ada data yang diperbarui' });
    }

    const query = `
        UPDATE admin 
        SET ${fieldsToUpdate.join(', ')} 
        WHERE id = $${fieldIndex}
        RETURNING *`;

    values.push(id);

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Admin tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memperbarui admin' });
    }
});

// Hapus admin
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM admin WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Admin tidak ditemukan' });
        }
        res.json({ message: 'Admin berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus admin' });
    }
});

module.exports = router;