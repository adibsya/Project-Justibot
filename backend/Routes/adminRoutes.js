const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate, authorizeAdmin } = require("../Middleware/authAdmin");

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await pool.query(
      "SELECT * FROM justibotadmins WHERE email = $1",
      [email]
    );
    if (admin.rowCount === 0)
      return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.rows[0].password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: admin.rows[0].id, email: admin.rows[0].email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 1000,
      sameSite: "lax",
    });

    res.json({ message: "Login successful", redirect: "/admin/dashboard" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saat login admin" });
  }
});

// Admin Logout
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
      "SELECT id, name, email FROM justibotadmins WHERE id = $1",
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


// Daftar admin
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM justibotadmins ORDER BY id ASC"
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Belum ada admin yang ditambahkan" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data admin" });
  }
});

// Detail admin berdasarkan ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM justibotadmins WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data admin" });
  }
});

// Tambah admin
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO justibotadmins (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan admin" });
  }
});

// Perbarui admin
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

// Hapus admin
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM justibotadmins WHERE id = $1 RETURNING *",
      [id]
    );
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
