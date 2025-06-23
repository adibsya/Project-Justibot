import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse"; // 1. Impor PapaParse
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definisikan state awal di luar komponen (tidak ada perubahan)
const initialState = {
  nama_kantor: "",
  alamat: "",
  provinsi: "", // Ini akan menyimpan ID provinsi
  kota: "", // Ini akan menyimpan nama kota
  no_telepon: "",
  email: "",
  medsos: "",
  nama_penanggung_jawab: "",
  jabatan_penanggung_jawab: "",
  no_hp_penanggung_jawab: "",
  email_penanggung_jawab: "",
  akta_pendirian_kantor: null,
  dokumen_npwp: null,
  dokumen_foto_kantor: null,
  keterangan_tambahan: "",
};

const FormPendaftaranKantor = () => {
  const [provinsiList, setProvinsiList] = useState([]);
  const [kotaList, setKotaList] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // 3. Efek untuk mengambil data dari file CSV lokal saat komponen dimuat.
  useEffect(() => {
    // Fungsi untuk mengambil dan mem-parse data CSV
    const fetchCsvData = (filePath, setter) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results) => {
          // Memastikan id dan province_id adalah angka untuk perbandingan
          const sanitizedData = results.data.map(item => ({
            ...item,
            id: String(item.id), // Simpan sebagai string agar konsisten
            ...(item.province_id && { province_id: String(item.province_id) })
          }));
          setter(sanitizedData);
        },
        error: (err) => {
          console.error(`Gagal memuat atau mem-parse ${filePath}:`, err);
        },
      });
    };

    fetchCsvData("/provinces.csv", setProvinsiList);
    fetchCsvData("/regencies.csv", setKotaList);
  }, []); // Dependensi kosong memastikan ini hanya berjalan sekali.

  // 4. Fungsi untuk menangani perubahan input, dengan logika filter lokal.
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      // Logika khusus jika provinsi diubah.
      if (name === "provinsi") {
        setFormData((prev) => ({ ...prev, kota: "" })); // Reset pilihan kota

        if (value) {
          // Filter daftar kota berdasarkan province_id yang dipilih secara lokal.
          const filteredKota = kotaList.filter(
            (kota) => kota.province_id === value
          );
          setKotaList(filteredKota);
        } else {
          // Jika pilihan provinsi dikosongkan, kosongkan juga daftar kota.
          setKotaList([]);
        }
      }
    }
  };

  // Fungsi handleSubmit tidak ada perubahan, karena masih mengirim ke backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      const selectedProvinsi = provinsiList.find(p => p.id === formData.provinsi);
      const dataToSend = { ...formData };
      if (selectedProvinsi) {
        dataToSend.provinsi = selectedProvinsi.name;
      }

      for (const key in dataToSend) {
        if (dataToSend[key]) {
          data.append(key, dataToSend[key]);
        }
      }

      const response = await axios.post("/api/form-pendaftaran-kantor", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Ganti alert dengan toast.success
      toast.success("Form berhasil dikirim!");
      console.log("Respon server:", response.data);
      
      setFormData(initialState);
      setKotaList([]);
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');

    } catch (error) {
      console.error("Gagal submit:", error.response?.data || error);
      // Ganti alert dengan toast.error
      toast.error("Gagal mengirim form. Silakan periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk styling input yang konsisten. (Tidak ada perubahan)
  const inputStyle =
    "mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary text-base";

  return (
    <div className="bg-gray-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-6xl mx-auto"> 
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-10"
        >
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
              Formulir Pendaftaran Kantor Hukum
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Silakan isi detail informasi kantor Anda di bawah ini.
            </p>
          </div>

          {/* Bagian 1: Informasi Kantor */}
          <div className="space-y-8 border-t border-gray-200 pt-10">
            <h3 className="text-2xl leading-6 font-bold text-gray-900">
              Informasi Kantor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Nama Kantor */}
              <div className="md:col-span-2">
                <label htmlFor="nama_kantor" className="block text-base font-medium text-gray-800">
                  Nama Kantor <span className="text-red-500">*</span>
                </label>
                <input type="text" id="nama_kantor" name="nama_kantor" value={formData.nama_kantor} onChange={handleChange} required className={inputStyle} placeholder="Contoh: Firma Hukum Sejahtera & Rekan" />
              </div>

              {/* Alamat Kantor */}
              <div className="md:col-span-2">
                <label htmlFor="alamat" className="block text-base font-medium text-gray-800">
                  Alamat Lengkap Kantor <span className="text-red-500">*</span>
                </label>
                <textarea id="alamat" name="alamat" rows="3" value={formData.alamat} onChange={handleChange} required className={inputStyle} placeholder="Jalan, nomor, kelurahan, kecamatan..."></textarea>
              </div>

              {/* Provinsi */}
              <div>
                <label htmlFor="provinsi" className="block text-base font-medium text-gray-800">
                  Provinsi <span className="text-red-500">*</span>
                </label>
                <select id="provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange} required className={inputStyle}>
                  <option value="">Pilih Provinsi</option>
                  {provinsiList.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kota */}
              <div>
                <label htmlFor="kota" className="block text-base font-medium text-gray-800">
                  Kota/Kabupaten <span className="text-red-500">*</span>
                </label>
                <select id="kota" name="kota" value={formData.kota} onChange={handleChange} required disabled={!formData.provinsi} className={`${inputStyle} disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                  <option value="">Pilih Kota/Kabupaten</option>
                  {kotaList.map((kota) => (
                    <option key={kota.id} value={kota.name}>
                      {kota.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* No Telepon & Email */}
              <div>
                <label htmlFor="no_telepon" className="block text-base font-medium text-gray-800">
                  No. Telepon Kantor <span className="text-red-500">*</span>
                </label>
                <input type="tel" id="no_telepon" name="no_telepon" value={formData.no_telepon} onChange={handleChange} required className={inputStyle} placeholder="021-1234567" />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-800">
                  Email Kantor <span className="text-red-500">*</span>
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="info@kantorhukum.com" />
              </div>
              
              {/* Media Sosial */}
              <div className="md:col-span-2">
                <label htmlFor="medsos" className="block text-base font-medium text-gray-800">
                  Media Sosial (Opsional)
                </label>
                <input type="text" id="medsos" name="medsos" value={formData.medsos} onChange={handleChange} className={inputStyle} placeholder="Instagram, LinkedIn, Facebook, dll." />
              </div>
            </div>
          </div>

          {/* Bagian 2: Penanggung Jawab */}
          <div className="space-y-8 border-t border-gray-200 pt-10">
            <h3 className="text-2xl leading-6 font-bold text-gray-900">
              Penanggung Jawab
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label htmlFor="nama_penanggung_jawab" className="block text-base font-medium text-gray-800">Nama Lengkap <span className="text-red-500">*</span></label>
                <input id="nama_penanggung_jawab" name="nama_penanggung_jawab" value={formData.nama_penanggung_jawab} onChange={handleChange} required placeholder="Nama penanggung jawab" className={inputStyle} />
              </div>
              <div>
                <label htmlFor="jabatan_penanggung_jawab" className="block text-base font-medium text-gray-800">Jabatan <span className="text-red-500">*</span></label>
                <input id="jabatan_penanggung_jawab" name="jabatan_penanggung_jawab" value={formData.jabatan_penanggung_jawab} onChange={handleChange} required placeholder="Contoh: Managing Partner" className={inputStyle} />
              </div>
              <div>
                <label htmlFor="no_hp_penanggung_jawab" className="block text-base font-medium text-gray-800">No. HP Aktif <span className="text-red-500">*</span></label>
                <input id="no_hp_penanggung_jawab" name="no_hp_penanggung_jawab" value={formData.no_hp_penanggung_jawab} onChange={handleChange} required placeholder="0812-3456-7890" className={inputStyle} />
              </div>
              <div>
                <label htmlFor="email_penanggung_jawab" className="block text-base font-medium text-gray-800">Email <span className="text-red-500">*</span></label>
                <input id="email_penanggung_jawab" name="email_penanggung_jawab" type="email" value={formData.email_penanggung_jawab} onChange={handleChange} required placeholder="email.pribadi@example.com" className={inputStyle} />
              </div>
            </div>
          </div>

          {/* Bagian 3: Upload Dokumen */}
          <div className="space-y-8 border-t border-gray-200 pt-10">
            <h3 className="text-2xl leading-6 font-bold text-gray-900">
              Unggah Dokumen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6"> {/* Changed md:grid-cols-3 to 1 for better layout on this section */}
              {/* Akta Pendirian */}
              <div>
                <label className="block text-base font-medium text-gray-800">
                  Akta Pendirian Kantor <span className="text-red-500">*</span>
                  <span className="block text-xs text-gray-500">(PDF/JPG/PNG)</span>
                </label>
                <div className={`${inputStyle} flex items-center`}>
                  <input name="akta_pendirian_kantor" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} required className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer w-full"/>
                </div>
                {formData.akta_pendirian_kantor && <p className="mt-2 text-sm text-green-600 truncate">File: {formData.akta_pendirian_kantor.name}</p>}
              </div>

              {/* NPWP */}
              <div>
                <label className="block text-base font-medium text-gray-800">
                  NPWP / SIUP / NIB
                  <span className="block text-xs text-gray-500">(Opsional)</span>
                </label>
                <div className={`${inputStyle} flex items-center`}>
                  <input name="dokumen_npwp" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer w-full"/>
                </div>
                  {formData.dokumen_npwp && <p className="mt-2 text-sm text-green-600 truncate">File: {formData.dokumen_npwp.name}</p>}
              </div>

              {/* Foto Kantor */}
              <div>
                <label className="block text-base font-medium text-gray-800">
                  Foto Kantor
                  <span className="block text-xs text-gray-500">(Opsional)</span>
                </label>
                <div className={`${inputStyle} flex items-center`}>
                  <input name="dokumen_foto_kantor" type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer w-full"/>
                </div>
                  {formData.dokumen_foto_kantor && <p className="mt-2 text-sm text-green-600 truncate">File: {formData.dokumen_foto_kantor.name}</p>}
              </div>
              
              {/* Keterangan Tambahan */}
              <div>
                <label htmlFor="keterangan_tambahan" className="block text-base font-medium text-gray-800">
                  Keterangan Tambahan (Opsional)
                </label>
                <textarea name="keterangan_tambahan" id="keterangan_tambahan" rows="4" value={formData.keterangan_tambahan} onChange={handleChange} placeholder="Informasi lain yang relevan..." className={inputStyle}></textarea>
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="pt-6">
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-secondary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  "Kirim Formulir Pendaftaran"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPendaftaranKantor;
