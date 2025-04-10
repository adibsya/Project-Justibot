const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");
const crypto = require("crypto");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../emailService");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      `SELECT * FROM justibotUsers WHERE email = $1`,
      [email]
    );
    if (existingUser.rowCount > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO justibotUsers (name, email, password, is_verified) VALUES ($1, $2, $3, false)`,
      [name, email, hashedPassword]
    );

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 jam
    await pool.query(
      `INSERT INTO verification_tokens (email, token, expires_at) VALUES ($1, $2, $3)`,
      [email, token, expiresAt]
    );

    const verificationLink = `http://localhost:3000/api/verify/${token}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).json({
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi.",
    });
  } catch (error) {
    console.error("Error saat registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      `SELECT * FROM justibotUsers WHERE email = $1`,
      [email]
    );
    if (user.rowCount === 0) {
      return res.status(401).json({ message: "User tidak ditemukan." });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password salah." });
    }

    if (!user.rows[0].is_verified) {
      return res
        .status(403)
        .json({ message: "Akun belum diverifikasi. Silakan cek email Anda." });
    }

    res.status(200).json({ message: "Login berhasil.", user: user.rows[0] });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat login." });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await pool.query(
      `SELECT * FROM justibotUsers WHERE email = $1`,
      [email]
    );

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    await pool.query(
      `INSERT INTO password_reset_tokens (email, token, expires_at) VALUES ($1, $2, $3)`,
      [email, resetToken, expiresAt]
    );

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({
      message: "Link reset password telah dikirim ke email Anda.",
    });
  } catch (error) {
    console.error("Error saat forgot password:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat forgot password." });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM password_reset_tokens WHERE token = $1`,
      [token]
    );

    if (result.rowCount === 0) {
      return res
        .status(400)
        .json({ message: "Token tidak valid atau sudah digunakan." });
    }

    const { email, expires_at } = result.rows[0];

    if (new Date() > expires_at) {
      return res.status(400).json({ message: "Token telah kedaluwarsa." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE justibotUsers SET password = $1 WHERE email = $2`,
      [hashedPassword, email]
    );
    await pool.query(`DELETE FROM password_reset_tokens WHERE token = $1`, [
      token,
    ]);

    res.status(200).json({ message: "Password berhasil direset." });
  } catch (error) {
    console.error("Error saat reset password:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat reset password." });
  }
});

// Verify Email Registrasi
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const result = await pool.query(
      `SELECT * FROM verification_tokens WHERE token = $1`,
      [token]
    );

    if (result.rowCount === 0) {
      return res.redirect("http://localhost:5173/verify-failed");
    }

    const { email, expires_at } = result.rows[0];
    if (new Date() > expires_at) {
      return res.redirect("http://localhost:5173/verify-failed");
    }

    await pool.query(
      `UPDATE justibotUsers SET is_verified = true WHERE email = $1`,
      [email]
    );
    await pool.query(`DELETE FROM verification_tokens WHERE email = $1`, [
      email,
    ]);

    return res.redirect("http://localhost:5173/verify-success");
  } catch (error) {
    console.error("Verifikasi gagal:", error);
    return res.redirect("http://localhost:5173/verify-failed");
  }
});

module.exports = router;
