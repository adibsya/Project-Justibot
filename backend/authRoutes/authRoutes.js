// const express = require('express');
// const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');
// const pool = require('../db');
// const sendVerificationEmail = require('../emailService');

// const router = express.Router();

// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const existingUser = await pool.query(`SELECT * FROM justibotUsers WHERE email = $1`, [email]);
//         if (existingUser.rowCount > 0) {
//             return res.status(400).json({ message: "Email sudah terdaftar." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const verificationToken = uuidv4();
//         const result = await pool.query(
//             `INSERT INTO justibotUsers (name, email, password, is_verified, verification_token) 
//             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//             [name, email, hashedPassword, false, verificationToken]
//         );

//         const verificationLink = `http://localhost:3000/verify/${verificationToken}`;
//         await sendVerificationEmail(email, verificationLink);
//         res.status(201).json({ message: "Registrasi berhasil! Cek email Anda untuk verifikasi." });
//     } catch (error) {
//         console.error("Error saat registrasi:", error);
//         res.status(500).json({ error: "Terjadi kesalahan saat registrasi." });
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await pool.query(`SELECT * FROM justibotUsers WHERE email = $1`, [email]);
//         if (user.rowCount === 0) {
//             return res.status(401).json({ message: "User tidak ditemukan." });
//         }

//         const validPassword = await bcrypt.compare(password, user.rows[0].password);
//         if (!validPassword) {
//             return res.status(401).json({ message: "Password salah." });
//         }

//         if (!user.rows[0].is_verified) {
//             return res.status(403).json({ message: "Silakan verifikasi email Anda terlebih dahulu." });
//         }
//         res.status(200).json({ message: "Login berhasil." });
//     } catch (error) {
//         console.error("Error saat login:", error);
//         res.status(500).json({ error: "Terjadi kesalahan saat login." });
//     }
// });

// router.get('/verify/:token', async (req, res) => {
//     try {
//         const { token } = req.params;
//         const result = await pool.query(
//             `UPDATE justibotUsers SET is_verified = true, verification_token = NULL 
//             WHERE verification_token = $1 RETURNING *`, [token]
//         );

//         if (result.rowCount === 0) {
//             return res.status(400).json({ message: "Token tidak valid atau sudah digunakan." });
//         }
//         res.status(200).json({ message: "Akun berhasil diverifikasi. Silakan login." });
//     } catch (error) {
//         console.error("Error saat verifikasi:", error);
//         res.status(500).json({ error: "Terjadi kesalahan saat verifikasi." });
//     }
// });

// router.post('/forgot-password', async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await pool.query(`SELECT * FROM justibotUsers WHERE email = $1`, [email]);
//         if (user.rowCount === 0) {
//             return res.status(404).json({ message: "User tidak ditemukan." });
//         }

//         const resetToken = uuidv4();
//         await pool.query(
//             `UPDATE justibotUsers SET reset_token = $1 WHERE email = $2`, [resetToken, email]
//         );

//         const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
//         // await sendResetPasswordEmail(email, resetLink);
//         res.status(200).json({ message: "Link reset password telah dikirim ke email Anda." });
//     } catch (error) {
//         console.error("Error saat forgot password:", error);
//         res.status(500).json({ error: "Terjadi kesalahan saat forgot password." });
//     }
// });

// router.post('/reset-password', async (req, res) => {
//     try {
//         const { token, password } = req.body;
//         const user = await pool.query(`SELECT * FROM justibotUsers WHERE reset_token = $1`, [token]);
//         if (user.rowCount === 0) {
//             return res.status(400).json({ message: "Token tidak valid." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await pool.query(
//             `UPDATE justibotUsers SET password = $1, reset_token = NULL WHERE reset_token = $2`, [hashedPassword, token]
//         );
//         res.status(200).json({ message: "Password berhasil direset." });
//     } catch (error) {
//         console.error("Error saat reset password:", error);
//         res.status(500).json({ error: "Terjadi kesalahan saat reset password." });
//     }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');

const router = express.Router();

// Registrasi (Tanpa Email Verification)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await pool.query(`SELECT * FROM justibotUsers WHERE email = $1`, [email]);
        if (existingUser.rowCount > 0) {
            return res.status(400).json({ message: "Email sudah terdaftar." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO justibotUsers (name, email, password, is_verified) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, hashedPassword, true]
        );

        res.status(201).json({ message: "Registrasi berhasil.", user: result.rows[0] });
    } catch (error) {
        console.error("Error saat registrasi:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat registrasi." });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(`SELECT * FROM justibotUsers WHERE email = $1`, [email]);
        if (user.rowCount === 0) {
            return res.status(401).json({ message: "User tidak ditemukan." });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: "Password salah." });
        }

        res.status(200).json({ message: "Login berhasil.", user: user.rows[0] });
    } catch (error) {
        console.error("Error saat login:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat login." });
    }
});

// Forgot Password - Generate Reset Token (Tanpa Email)
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await pool.query(`SELECT * FROM justibotUsers WHERE email = $1`, [email]);
        if (user.rowCount === 0) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }

        const resetToken = uuidv4();
        await pool.query(`UPDATE justibotUsers SET verification_token = $1 WHERE email = $2`, [resetToken, email]);

        res.status(200).json({
            message: "Token reset password berhasil dibuat.",
            reset_token: resetToken
        });
    } catch (error) {
        console.error("Error saat forgot password:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat forgot password." });
    }
});

// Reset Password - Gunakan Token untuk Reset
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await pool.query(`SELECT * FROM justibotUsers WHERE verification_token = $1`, [token]);
        if (user.rowCount === 0) {
            return res.status(400).json({ message: "Token tidak valid atau sudah digunakan." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(`UPDATE justibotUsers SET password = $1, verification_token = NULL WHERE verification_token = $2`, 
            [hashedPassword, token]);

        res.status(200).json({ message: "Password berhasil direset." });
    } catch (error) {
        console.error("Error saat reset password:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat reset password." });
    }
});

module.exports = router;