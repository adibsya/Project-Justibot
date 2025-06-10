const express = require("express");
const pool = require("../db");

const router = express.Router();

// Catat kunjungan profil pengacara
router.post("/kunjungan/:pengacaraId", async (req, res) => {
    const { pengacaraId } = req.params;
  
    try {
      await pool.query(
        `INSERT INTO kunjungan_pengacara (pengacara_id) VALUES ($1)`,
        [pengacaraId]
      );
      res.status(200).json({ success: true, message: "Kunjungan dicatat" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Gagal mencatat kunjungan" });
    }
  });

  router.get("/statistik-kunjungan", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          p.id AS pengacara_id,
          p.nama,
          COUNT(kp.id) AS total_kunjungan
        FROM 
          kunjungan_pengacara kp
        JOIN 
          lawyers p ON kp.pengacara_id = p.id
        GROUP BY 
          p.id, p.nama
        ORDER BY 
          total_kunjungan DESC
        LIMIT 10
      `);
  
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Gagal ambil statistik kunjungan." });
    }
  });
  
  

module.exports = router;