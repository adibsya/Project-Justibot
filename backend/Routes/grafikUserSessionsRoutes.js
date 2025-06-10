const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { range } = req.query;

    let interval, labelArray;

    if (range === "mingguan") {
      interval = "7 days";
      labelArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    } else if (range === "bulanan") {
      interval = "1 year";
      labelArray = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
    } else if (range === "tahunan") {
      interval = "5 years";
      const currentYear = new Date().getFullYear();
      labelArray = [];
      for (let y = currentYear; y < currentYear + 5; y++) {
        labelArray.push(y.toString());
      }
    } else {
      interval = "7 days";
      labelArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    }

    let result;

    if (range === "bulanan") {
      result = await pool.query(`
        SELECT EXTRACT(MONTH FROM login_time) AS bulan, COUNT(*) AS sessions
        FROM user_sessions
        WHERE login_time >= (NOW() - interval '${interval}')
        GROUP BY bulan
        ORDER BY bulan
      `);
    } else if (range === "tahunan") {
      result = await pool.query(`
        SELECT EXTRACT(YEAR FROM login_time) AS tahun, COUNT(*) AS sessions
        FROM user_sessions
        WHERE login_time >= (NOW() - interval '${interval}')
        GROUP BY tahun
        ORDER BY tahun
      `);
    } else {
      result = await pool.query(`
        SELECT login_time::date AS tanggal, COUNT(*) AS sessions
        FROM user_sessions
        WHERE login_time >= (NOW() - interval '${interval}')
        GROUP BY tanggal
        ORDER BY tanggal
      `);
    }

    const sessionMap = {};

    result.rows.forEach(row => {
      let labelKey;

      if (range === "mingguan") {
        const date = new Date(row.tanggal);
        const day = date.getDay(); // 0 = Minggu
        labelKey = day === 0 ? 6 : day - 1;
        labelKey = labelArray[labelKey];
      } else if (range === "bulanan") {
        labelKey = labelArray[parseInt(row.bulan, 10) - 1];
      } else if (range === "tahunan") {
        labelKey = row.tahun.toString();
      }

      sessionMap[labelKey] = parseInt(row.sessions, 10);
    });

    const data = labelArray.map(label => ({
      tanggal: label,
      sessions: sessionMap[label] || 0,
    }));

    res.json(data);

  } catch (error) {
    console.error("Gagal mengambil statistik sesi:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
