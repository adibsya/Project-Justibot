const express = require("express");
const pool = require("../db");

const router = express.Router();

// Daftar pengacara
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pengacara ORDER BY created_at ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data pengacara" });
  }
});

// Detail pengacara berdasarkan ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM pengacara WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pengacara tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil pengacara" });
  }
});

// Tambah pengacara
router.post("/", async (req, res) => {
  const {
    nama,
    lokasi,
    pengalaman_tahun,
    asal_univ,
    spesialisasi,
    deskripsi,
    industri,
    foto_profil,
    tersedia,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pengacara 
        (nama, lokasi, pengalaman_tahun, asal_univ, spesialisasi, deskripsi, industri, foto_profil, tersedia) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
      [
        nama,
        lokasi,
        pengalaman_tahun,
        asal_univ,
        spesialisasi,
        deskripsi,
        industri,
        foto_profil,
        tersedia,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting lawyer:", error);
    res.status(500).json({ error: "Gagal menambahkan pengacara" });
  }
});

// Update pengacara
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in req.body) {
    fields.push(`${key} = $${idx}`);
    values.push(req.body[key]);
    idx++;
  }

  if (fields.length === 0) {
    return res
      .status(400)
      .json({ error: "Tidak ada data yang dikirim untuk diperbarui" });
  }

  const query = `UPDATE pengacara SET ${fields.join(
    ", "
  )} WHERE id = $${idx} RETURNING *`;
  values.push(id);

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pengacara tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui pengacara" });
  }
});

// Hapus pengacara
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM pengacara WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pengacara tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus pengacara" });
  }
});

module.exports = router;
