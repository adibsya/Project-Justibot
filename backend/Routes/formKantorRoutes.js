const express = require('express');
const pool = require('../db');
const multer = require('multer');
const router = express.Router();

// Create a new kantor form
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload multiple fields
const uploadFields = upload.fields([
  { name: 'akta_pendirian_kantor', maxCount: 1 },
  { name: 'dokumen_npwp', maxCount: 1 },
  { name: 'dokumen_foto_kantor', maxCount: 1 }
]);

// Get all kantor forms
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kantor_hukum ORDER BY id DESC');
    if (result.length === 0) {
      return res.status(404).json({ message: 'Belum ada data kantor yang ditambahkan' });
    }
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching kantor forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get kantor form by ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.query('SELECT * FROM kantor_hukum WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'Kantor form not found' });
//     }
//     res.json(rows[0]);
//   } catch (error) {
//     console.error('Error fetching kantor form:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.post('/', uploadFields, async (req, res) => {
  try {
    const {
      nama_kantor,
      alamat,
      provinsi,
      kota,
      no_telepon,
      email,
      medsos,
      nama_penanggung_jawab,
      jabatan_penanggung_jawab,
      no_hp_penanggung_jawab,
      email_penanggung_jawab,
      keterangan_tambahan
    } = req.body;

    const aktaFile = req.files['akta_pendirian_kantor']?.[0]?.buffer || null;
    const npwpFile = req.files['dokumen_npwp']?.[0]?.buffer || null;
    const fotoKantorFile = req.files['dokumen_foto_kantor']?.[0]?.buffer || null;

    const query = `
      INSERT INTO kantor_hukum (
        nama_kantor, alamat, provinsi, kota, no_telepon, email, medsos,
        nama_penanggung_jawab, jabatan_penanggung_jawab, no_hp_penanggung_jawab, email_penanggung_jawab,
        akta_pendirian_kantor, dokumen_npwp, dokumen_foto_kantor,
        keterangan_tambahan
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7,
              $8, $9, $10, $11,
              $12, $13, $14,
              $15)
      RETURNING *;
    `;

    const values = [
      nama_kantor, alamat, provinsi, kota, no_telepon, email, medsos,
      nama_penanggung_jawab, jabatan_penanggung_jawab, no_hp_penanggung_jawab, email_penanggung_jawab,
      aktaFile, npwpFile, fotoKantorFile,
      keterangan_tambahan
    ];

    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Data kantor berhasil disimpan', data: result.rows[0] });
  } catch (error) {
    console.error('Gagal menyimpan data kantor:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan data kantor' });
  }
});

// Add this new route for getting approved kantor listings
router.get('/approved', async (req, res) => {
  try {
    const query = {
      text: 'SELECT * FROM kantor_hukum WHERE status = $1',
      values: ['approved']
    };
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching approved kantor list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update the pending registrations route
router.get('/pending', async (req, res) => {
  try {
    console.log('Fetching pending registrations...');
    
    const query = {
      text: `
        SELECT id, nama_kantor, alamat, provinsi, kota, 
               no_telepon, email, status, 
               akta_pendirian_kantor, dokumen_npwp, 
               dokumen_foto_kantor, created_at
        FROM kantor_hukum 
        WHERE status = 'pending' 
        ORDER BY created_at DESC;
      `,
    };

    const result = await pool.query(query);
    console.log(`Found ${result.rows.length} pending registrations`);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: 'Belum ada pendaftaran kantor yang menunggu persetujuan',
        data: []
      });
    }
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Update registration status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = {
      text: 'UPDATE kantor_hukum SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      values: [status, id]
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating registration status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;