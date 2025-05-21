const express = require ('express');
const pool = require ('../db');

const router = express.Router ();

router.get ('/', async (req, res) => {
    try {
        const result = await pool.query ('SELECT * FROM feedback ORDER BY id ASC');
        if (result.rows.length === 0) {
            return res.status (404).json ({ message: 'Belum ada ide artikel yang ditambahkan' });
        };
        res.json (result.rows);
    } catch (error) {
        console.error (error);
        res.status (500).json ({ error: 'Gagal mengambil data feedback' });
    };
});

router.post ('/', async (req, res) => {
    try {
        const { email, rating, feedback } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test (email)) {
            return res.status (400).json ({ error: 'Format email tidak valid' });
        };
        const result = await pool.query (
            'INSERT INTO feedback (email, rating, feedback) VALUES ($1, $2, $3) RETURNING *',
            [email, rating, feedback]
        );
        res.status (201).json (result.rows[0]);
    } catch (error) {
        console.error (error);
        res.status (500).json ({ error: 'Gagal menambahkan feedback' });
    };
});