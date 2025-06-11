const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate, authorizeAdmin } = require("../Middleware/authAdmin");

const router = express.Router();

// ====================== ADMIN LOGIN ======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await pool.query("SELECT * FROM justibotadmins WHERE email = $1", [email]);
    if (admin.rowCount === 0) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.rows[0].password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: admin.rows[0].id, email: admin.rows[0].email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      sameSite: "lax",
    });

    res.json({ message: "Login successful", redirect: "/admin/dashboard" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saat login admin" });
  }
});

// ====================== ADMIN LOGOUT ======================
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout berhasil." });
});

router.use(authenticate, authorizeAdmin);

// GET /api/admin/profile - Ambil data admin berdasarkan token
router.get("/profile", async (req, res) => {
  try {
    const adminId = req.user.id; // sudah diisi dari middleware authenticate
    const result = await pool.query(
      "SELECT id, name, email, no_hp, alamat, foto_profil FROM justibotadmins WHERE id = $1",
      [adminId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data profil admin" });
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
        const bufferFoto = Buffer.from(req.body.foto_profil, 'base64');
        fields.push(`foto_profil = $${index++}`);
        values.push(bufferFoto);
        
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Tidak ada data untuk diperbarui.' });
    }
  
    values.push(userId);
  
    const query = `
      UPDATE justibotadmins
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
      "SELECT password FROM justibotadmins WHERE id = $1",
      [userId]
    );
    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password saat ini salah." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE justibotadmins SET password = $1 WHERE id = $2", [
      hashedPassword,
      userId,
    ]);

    res.json({ message: "Password berhasil diperbarui." });
  } catch (error) {
    console.error("Gagal mengubah password:", error);
    res.status(500).json({ message: "Gagal mengubah password." });
  }
});

// Daftar admin
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM justibotadmins ORDER BY id ASC");
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Belum ada admin yang ditambahkan" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data admin" });
  }
});

// ====================== GET ADMIN BY ID ======================
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM justibotadmins WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data admin" });
  }
});

// ====================== CREATE ADMIN ======================
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO justibotadmins (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan admin" });
  }
});

// ====================== UPDATE ADMIN ======================
router.put("/:id", async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);
    fieldsToUpdate.push(`password = $${fieldIndex++}`);
    values.push(hashedPassword);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ error: "Tidak ada data yang diperbarui" });
  }

  const query = `
    UPDATE justibotadmins 
    SET ${fieldsToUpdate.join(", ")} 
    WHERE id = $${fieldIndex}
    RETURNING *`;

  values.push(id);

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui admin" });
  }
});

// ====================== DELETE ADMIN ======================
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM justibotadmins WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin tidak ditemukan" });
    }
    res.json({ message: "Admin berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus admin" });
  }
});

module.exports = router;
