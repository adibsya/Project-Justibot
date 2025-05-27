const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/log-kunjungan", async (req, res) => {
  const ip = req.ip; // atau bisa juga req.headers['x-forwarded-for'] jika pakai proxy
  const now = new Date();

  try {
    const existing = await pool.query(
      "SELECT * FROM log_kunjungan_ip WHERE ip_address = $1",
      [ip]
    );

    if (existing.rows.length > 0) {
      const lastVisit = new Date(existing.rows[0].last_visit);
      const diffMs = now - lastVisit;
      const jedaMs = 5 * 60 * 1000;

      if (diffMs < jedaMs) {
        // Masih dalam jeda waktu, tidak mencatat kunjungan baru
        return res
          .status(200)
          .json({ message: "Sudah tercatat, tunggu jeda waktu" });
      }

      // Update waktu kunjungan terakhir
      await pool.query(
        "UPDATE log_kunjungan_ip SET last_visit = $1 WHERE ip_address = $2",
        [now, ip]
      );
    } else {
      // Insert record baru untuk IP ini
      await pool.query(
        "INSERT INTO log_kunjungan_ip (ip_address, last_visit) VALUES ($1, $2)",
        [ip, now]
      );
    }

    // Catat kunjungan ke tabel utama seperti biasa
    const today = now.toISOString().split("T")[0];
    const check = await pool.query(
      "SELECT * FROM kunjungan_artikel WHERE tanggal = $1",
      [today]
    );

    if (check.rows.length > 0) {
      await pool.query(
        "UPDATE kunjungan_artikel SET jumlah_kunjungan = jumlah_kunjungan + 1 WHERE tanggal = $1",
        [today]
      );
    } else {
      await pool.query(
        "INSERT INTO kunjungan_artikel (tanggal, jumlah_kunjungan) VALUES ($1, 1)",
        [today]
      );
    }

    res.status(200).json({ message: "Kunjungan berhasil tercatat" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mencatat kunjungan" });
  }
});

router.get("/statistik-kunjungan", async (req, res) => {
  try {
    const { range } = req.query;

    let interval, labelArray;

    if (range === "mingguan") {
      interval = '7 days';
      labelArray = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    } else if (range === "bulanan") {
      interval = '1 year'; // ambil 1 tahun terakhir untuk data bulanan
      labelArray = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    } else if (range === "tahunan") {
      interval = '5 years'; // misal 5 tahun terakhir
      const currentYear = new Date().getFullYear();
      labelArray = [];
      for (let y = currentYear; y <= currentYear + 4; y++) {
        labelArray.push(y.toString());
      }
    } else {
      interval = '7 days';
      labelArray = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    }

    let result;

    if (range === "bulanan") {
      // Ambil jumlah kunjungan per bulan selama 1 tahun terakhir
      result = await pool.query(`
        SELECT EXTRACT(MONTH FROM tanggal) AS bulan, SUM(jumlah_kunjungan) AS kunjungan
        FROM kunjungan_artikel
        WHERE tanggal >= (NOW() - interval '${interval}')
        GROUP BY bulan
        ORDER BY bulan
      `);
    } else if (range === "tahunan") {
      // Ambil jumlah kunjungan per tahun selama 5 tahun terakhir
      result = await pool.query(`
        SELECT EXTRACT(YEAR FROM tanggal) AS tahun, SUM(jumlah_kunjungan) AS kunjungan
        FROM kunjungan_artikel
        WHERE tanggal >= (NOW() - interval '${interval}')
        GROUP BY tahun
        ORDER BY tahun
      `);
    } else {
      // default mingguan: per tanggal seperti semula
      result = await pool.query(`
        SELECT tanggal, SUM(jumlah_kunjungan) as kunjungan
        FROM kunjungan_artikel
        WHERE tanggal >= (NOW() - interval '${interval}')
        GROUP BY tanggal
        ORDER BY tanggal
      `);
    }

    const kunjunganMap = {};

    result.rows.forEach(row => {
      let labelKey;

      if (range === "mingguan") {
        const date = new Date(row.tanggal);
        const day = date.getDay();
        labelKey = (day === 0) ? 6 : day - 1;
        labelKey = labelArray[labelKey];
      } else if (range === "bulanan") {
        // bulan dari 1-12, labelArray 0-11
        labelKey = labelArray[parseInt(row.bulan, 10) - 1];
      } else if (range === "tahunan") {
        labelKey = row.tahun.toString();
      }

      kunjunganMap[labelKey] = parseInt(row.kunjungan, 10);
    });

    const data = labelArray.map(label => ({
      tanggal: label,
      kunjungan: kunjunganMap[label] || 0,
    }));

    res.json(data);

  } catch (error) {
    console.error("Gagal mengambil statistik kunjungan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
