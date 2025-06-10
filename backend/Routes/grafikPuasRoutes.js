const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/statistik-puas", async (req, res) => {
  try {
    const { range } = req.query;

    if (range !== "bulanan") {
      return res.status(400).json({ message: "Range tidak didukung. Gunakan ?range=bulanan" });
    }

    const labelArray = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const result = await pool.query(`
      SELECT 
        EXTRACT(MONTH FROM created_at) AS bulan,
        COUNT(*) FILTER (WHERE rating >= 4) AS puas,
        COUNT(*) FILTER (WHERE rating < 4) AS tidak_puas
      FROM feedback
      WHERE created_at >= (NOW() - INTERVAL '1 year')
      GROUP BY bulan
      ORDER BY bulan
    `);

    const dataMap = {};
    result.rows.forEach(row => {
      const bulanIndex = parseInt(row.bulan, 10) - 1;
      dataMap[labelArray[bulanIndex]] = {
        puas: parseInt(row.puas, 10),
        tidakPuas: parseInt(row.tidak_puas, 10),
      };
    });

    const data = labelArray.map(bulan => ({
      bulan,
      puas: dataMap[bulan]?.puas || 0,
      tidakPuas: dataMap[bulan]?.tidakPuas || 0
    }));

    res.json(data);
  } catch (error) {
    console.error("Gagal mengambil statistik rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
