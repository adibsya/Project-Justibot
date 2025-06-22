const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const authenticate = require("../Middleware/authenticate");

const router = express.Router();

// GET /api/users/profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT id, name, email, no_hp, alamat, foto_profil FROM justibotusers WHERE id = $1",
      [userId]
    );
    const user = result.rows[0];
    if (user.foto_profil) {
      user.foto_profil = `data:image/jpeg;base64,${user.foto_profil.toString('base64')}`;
    }
    res.json(user);
  } catch (error) {
    console.error("Gagal mengambil profil:", error);
    res.status(500).json({ message: "Gagal mengambil profil pengguna." });
  }
});

// PATCH /api/users/profile
router.patch('/profile', authenticate, async (req, res) => {
    const userId = req.user.id;
    const fields = [];
    const values = [];
    let index = 1;
  
    if (req.body.name) {
      fields.push(`name = $${index++}`);
      values.push(req.body.name);
    }
    if (req.body.email) {
      fields.push(`email = $${index++}`);
      values.push(req.body.email);
    }
    if (req.body.no_hp) {
      fields.push(`no_hp = $${index++}`);
      values.push(req.body.no_hp);
    }
    if (req.body.alamat) {
      fields.push(`alamat = $${index++}`);
      values.push(req.body.alamat);
    }
    if (req.body.foto_profil) {
        // Hapus prefix data URL jika ada
        const base64Data = req.body.foto_profil.replace(/^data:image\/\w+;base64,/, '');
        const bufferFoto = Buffer.from(base64Data, 'base64');
        fields.push(`foto_profil = $${index++}`);
        values.push(bufferFoto);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Tidak ada data untuk diperbarui.' });
    }
  
    values.push(userId);
  
    const query = `
      UPDATE justibotusers
      SET ${fields.join(', ')}
      WHERE id = $${index}
    `;
  
    try {
      await pool.query(query, values);
      res.json({ message: 'Profil berhasil diperbarui.' });
    } catch (error) {
      console.error('Gagal memperbarui profil:', error);
      res.status(500).json({ message: 'Gagal memperbarui profil.' });
    }
  });

// POST /api/users/update-password
router.post("/update-password", authenticate, async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await pool.query(
      "SELECT password FROM justibotusers WHERE id = $1",
      [userId]
    );
    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password saat ini salah." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE justibotusers SET password = $1 WHERE id = $2", [
      hashedPassword,
      userId,
    ]);

    res.json({ message: "Password berhasil diperbarui." });
  } catch (error) {
    console.error("Gagal mengubah password:", error);
    res.status(500).json({ message: "Gagal mengubah password." });
  }
});

module.exports = router;
