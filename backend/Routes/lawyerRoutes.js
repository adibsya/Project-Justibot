const express = require("express");
const pool = require("../db");
const multer = require("multer");

const storage = multer.memoryStorage(); // simpan foto di RAM
const upload = multer({ storage });

const router = express.Router();

// Ambil semua pengacara
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM lawyers ORDER BY created_at ASC");

    const lawyers = result.rows.map((lawyer) => {
      if (lawyer.foto_profil && Buffer.isBuffer(lawyer.foto_profil)) {
        lawyer.foto_profil = lawyer.foto_profil.toString("utf-8");
      }
      return lawyer;
    });

    res.json(lawyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data pengacara" });
  }
});

// Ambil detail pengacara berdasarkan NAMA
router.get("/:nama", async (req, res) => {
  const { nama } = req.params;
  try {
    const result = await pool.query("SELECT * FROM lawyers WHERE nama = $1", [nama]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pengacara tidak ditemukan" });
    }

    const lawyer = result.rows[0];

    if (lawyer.foto_profil && Buffer.isBuffer(lawyer.foto_profil)) {
      lawyer.foto_profil = lawyer.foto_profil.toString("utf-8");
    }

    res.json(lawyer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil pengacara" });
  }
});


// Ambil detail pengacara berdasarkan ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM lawyers WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pengacara tidak ditemukan" });
    }

    const lawyer = result.rows[0];

    if (lawyer.foto_profil && Buffer.isBuffer(lawyer.foto_profil)) {
      lawyer.foto_profil = lawyer.foto_profil.toString("utf-8");
    }

    res.json(lawyer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil pengacara" });
  }
});

// Tambah pengacara
router.post("/", upload.single("foto_profil"), async (req, res) => {
  try {
    const {
      nama,
      lokasi,
      pengalaman_tahun,
      asal_univ,
      spesialisasi,
      deskripsi,
      industri,
      no_wa,
      nama_ig,
    } = req.body;

    // Cek duplikasi no_wa
    const waCheck = await pool.query("SELECT id FROM lawyers WHERE no_wa = $1", [no_wa]);
    if (waCheck.rows.length > 0) {
      return res.status(400).json({ error: "Nomor WhatsApp sudah digunakan" });
    }

    // Cek duplikasi nama_ig
    const igCheck = await pool.query("SELECT id FROM lawyers WHERE nama_ig = $1", [nama_ig]);
    if (igCheck.rows.length > 0) {
      return res.status(400).json({ error: "Nama nama_ig sudah digunakan" });
    }

    const deskripsiArray = deskripsi
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const foto_profil = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : null;

    const result = await pool.query(
      `INSERT INTO lawyers (
        nama, lokasi, pengalaman_tahun, asal_univ, spesialisasi,
        deskripsi, industri, foto_profil, no_wa, nama_ig, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
      RETURNING *`,
      [
        nama,
        lokasi,
        parseInt(pengalaman_tahun),
        asal_univ,
        spesialisasi,
        deskripsiArray,
        industri,
        foto_profil,
        no_wa,
        nama_ig,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan pengacara" });
  }
});

// Edit pengacara
router.patch("/:id", upload.single("foto_profil"), async (req, res) => {
  
  const { id } = req.params;
  const {
    nama,
    lokasi,
    pengalaman_tahun,
    asal_univ,
    spesialisasi,
    deskripsi,
    industri,
    no_wa,
    nama_ig,
  } = req.body;

  const foto_profil = req.file
    ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    : null;

  try {
    const updateQuery = `
      UPDATE lawyers SET
        nama = $1,
        lokasi = $2,
        pengalaman_tahun = $3,
        asal_univ = $4,
        spesialisasi = $5,
        deskripsi = $6,
        industri = $7,
        no_wa = $8,
        nama_ig = $9,
        foto_profil = COALESCE($10, foto_profil),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
    `;

    const values = [
      nama,
      lokasi,
      parseInt(pengalaman_tahun),
      asal_univ,
      spesialisasi,
      Array.isArray(deskripsi) ? deskripsi : deskripsi.split("\n"),
      industri,
      no_wa,
      nama_ig,
      foto_profil,
      id,
    ];

    await pool.query(updateQuery, values);
    res.json({ success: true });
  } catch (error) {
    console.error("Update gagal:", error);
    res.status(500).json({ error: "Update gagal" });
  }
});

// Hapus pengacara
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM lawyers WHERE id = $1 RETURNING *", [id]);
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
