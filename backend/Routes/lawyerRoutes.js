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

// // ✅ Cek duplikat sebelum submit (opsional jika frontend mau pakai AJAX)
// router.post('/check-duplicate', async (req, res) => {
//   try {
//     const { no_wa, nama_ig } = req.body;

//     const conflictFields = [];
//     let message = "";

//     const checkNoWa = await pool.query("SELECT 1 FROM lawyers WHERE no_wa = $1", [no_wa]);
//     const checkNamaIg = await pool.query("SELECT 1 FROM lawyers WHERE nama_ig = $1", [nama_ig]);

//     if (checkNoWa.rowCount > 0) conflictFields.push("no_wa");
//     if (checkNamaIg.rowCount > 0) conflictFields.push("nama_ig");

//     if (conflictFields.length > 0) {
//       if (conflictFields.includes("no_wa") && conflictFields.includes("nama_ig")) {
//         message = "Nomor WhatsApp dan nama Instagram sudah digunakan.";
//       } else if (conflictFields.includes("no_wa")) {
//         message = "Nomor WhatsApp sudah digunakan.";
//       } else if (conflictFields.includes("nama_ig")) {
//         message = "Nama Instagram sudah digunakan.";
//       }

//       return res.status(409).json({ message, fields: conflictFields });
//     }

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error saat mengecek duplikat:", error);
//     res.status(500).json({ error: "Terjadi kesalahan di server saat mengecek duplikat" });
//   }
// });

// Tambah pengacara
router.post("/", upload.single("foto_profil"), async (req, res) => {
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

  const file = req.file;

  try {
    // Cek duplikat
    const duplikat = await pool.query(
      `SELECT no_wa, nama_ig FROM lawyers WHERE no_wa = $1 OR nama_ig = $2`,
      [no_wa, nama_ig]
    );

    const fields = [];
    duplikat.rows.forEach((row) => {
      if (row.no_wa === no_wa) fields.push("no_wa");
      if (row.nama_ig === nama_ig) fields.push("nama_ig");
    });

    if (fields.length > 0) {
      return res.status(409).json({ message: "Data duplikat", fields });
    }

    // Ubah foto ke base64 (seperti PATCH)
    const foto_profil = file
      ? `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      : null;

    // Konversi deskripsi jika perlu (TEXT[])
    const deskripsiArray = Array.isArray(deskripsi) ? deskripsi : [deskripsi];

    await pool.query(
      `INSERT INTO lawyers 
      (nama, lokasi, pengalaman_tahun, asal_univ, spesialisasi, deskripsi, industri, foto_profil, no_wa, nama_ig, updated_at) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())`,
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

    res.status(201).json({ message: "Pengacara berhasil ditambahkan" });
  } catch (error) {
    console.error("Error saat menambahkan lawyer:", error);
    res.status(500).json({ message: "Gagal menambahkan pengacara" });
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
