import React, { useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormTambahLawyer = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    pengalaman_tahun: "",
    asal_univ: "",
    spesialisasi: "",
    deskripsi: "",
    industri: "",
    file: null,
    no_wa: "",
    nama_ig: "",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus error saat user input ulang
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prev) => ({ ...prev, file: selectedFile }));

    // Hapus error file jika sudah ada
    setErrors((prev) => ({ ...prev, file: null }));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    navigate("/admin/lawyers");
  };

  // Fungsi validasi yang mengembalikan object error per field
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) newErrors.nama = "Nama wajib diisi.";
    if (!formData.lokasi.trim()) newErrors.lokasi = "Lokasi wajib diisi.";
    if (!formData.asal_univ.trim()) newErrors.asal_univ = "Asal universitas wajib diisi.";
    if (!formData.spesialisasi.trim()) newErrors.spesialisasi = "Spesialisasi wajib diisi.";
    if (!formData.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi.";
    if (!formData.industri.trim()) newErrors.industri = "Industri wajib diisi.";

    // Validasi nomor WhatsApp: wajib dan format harus diawali 62 dan 10-17 digit angka
    if (!formData.no_wa.trim()) {
      newErrors.no_wa = "Nomor WhatsApp wajib diisi.";
    } else if (!/^62\d{8,15}$/.test(formData.no_wa.trim())) {
      newErrors.no_wa = "Nomor WhatsApp harus diawali dengan 62 dan terdiri dari 10-17 digit angka.";
    }

    // Validasi pengalaman tahun harus angka positif
    if (!formData.pengalaman_tahun.trim()) {
      newErrors.pengalaman_tahun = "Pengalaman wajib diisi.";
    } else if (!/^\d+$/.test(formData.pengalaman_tahun.trim()) || parseInt(formData.pengalaman_tahun) < 0) {
      newErrors.pengalaman_tahun = "Pengalaman harus berupa angka positif.";
    }

    // Validasi file harus ada dan type sesuai
    if (!formData.file) {
      newErrors.file = "Foto profil wajib diunggah.";
    } else {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(formData.file.type)) {
        newErrors.file = "File harus berupa JPG, PNG, atau PDF.";
      }
    }

    return newErrors;
  };

  const handleTambahPengacara = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("lokasi", formData.lokasi);
    data.append("pengalaman_tahun", formData.pengalaman_tahun);
    data.append("asal_univ", formData.asal_univ);
    data.append("spesialisasi", formData.spesialisasi);
    data.append("deskripsi", formData.deskripsi);
    data.append("industri", formData.industri);
    data.append("foto_profil", formData.file);
    data.append("no_wa", formData.no_wa);
    data.append("nama_ig", formData.nama_ig);

    try {
      await axios.post("http://localhost:3000/api/lawyers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/lawyers");
      }, 2500);
    } catch (error) {
      console.error("Error menambahkan pengacara:", error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto p-6 relative">
      {/* Popup success */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Berhasil menambahkan pengacara!</p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow border border-[#652B19] w-full max-w-none">
        <h2 className="text-2xl font-bold mb-6 border-b border-[#652B19] pb-2 text-[#2B1700]">
          Tambahkan Pengacara
        </h2>

        {/* Identitas */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-[#2B1700]">Identitas Pengacara</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  value={formData.file ? formData.file.name : ""}
                  readOnly
                  className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
                    errors.file ? "border-red-500" : "border-[#d6b6aa]"
                  }`}
                  placeholder="No file chosen"
                />
                {errors.file && (
                  <p className="text-red-600 text-sm mt-1">{errors.file}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#652B19] text-white px-4 py-2 rounded-xl"
              >
                Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Nama Pengacara"
                className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
                  errors.nama ? "border-red-500" : "border-[#d6b6aa]"
                }`}
              />
              {errors.nama && (
                <p className="text-red-600 text-sm mt-1">{errors.nama}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                placeholder="Lokasi Pengacara"
                className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
                  errors.lokasi ? "border-red-500" : "border-[#d6b6aa]"
                }`}
              />
              {errors.lokasi && (
                <p className="text-red-600 text-sm mt-1">{errors.lokasi}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="pengalaman_tahun"
                value={formData.pengalaman_tahun}
                onChange={handleInputChange}
                placeholder="Pengalaman Pengacara"
                className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
                  errors.pengalaman_tahun ? "border-red-500" : "border-[#d6b6aa]"
                }`}
              />
              {errors.pengalaman_tahun && (
                <p className="text-red-600 text-sm mt-1">{errors.pengalaman_tahun}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="asal_univ"
                value={formData.asal_univ}
                onChange={handleInputChange}
                placeholder="Pendidikan Pengacara"
                className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
                  errors.asal_univ ? "border-red-500" : "border-[#d6b6aa]"
                }`}
              />
              {errors.asal_univ && (
                <p className="text-red-600 text-sm mt-1">{errors.asal_univ}</p>
              )}
            </div>
          </div>
        </div>

        {/* Spesialis */}
        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Spesialis Pengacara</h3>
          <input
            type="text"
            name="spesialisasi"
            value={formData.spesialisasi}
            onChange={handleInputChange}
            placeholder="Daftar Spesialis"
            className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
              errors.spesialisasi ? "border-red-500" : "border-[#d6b6aa]"
            }`}
          />
          {errors.spesialisasi && (
            <p className="text-red-600 text-sm mt-1">{errors.spesialisasi}</p>
          )}
        </div>

        {/* Tentang */}
        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Tentang Pengacara</h3>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            placeholder="Tekan enter untuk setiap satu kalimat"
            className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full h-24 resize-none text-[#2B1700] ${
              errors.deskripsi ? "border-red-500" : "border-[#d6b6aa]"
            }`}
          />
          {errors.deskripsi && (
            <p className="text-red-600 text-sm mt-1">{errors.deskripsi}</p>
          )}
          <input
            type="text"
            name="industri"
            value={formData.industri}
            onChange={handleInputChange}
            placeholder="Bidang Industri"
            className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
              errors.industri ? "border-red-500" : "border-[#d6b6aa]"
            }`}
          />
          {errors.industri && (
            <p className="text-red-600 text-sm mt-1">{errors.industri}</p>
          )}
          <input
            type="text"
            name="no_wa"
            value={formData.no_wa}
            onChange={handleInputChange}
            placeholder="Nomor WhatsApp"
            className={`bg-[#f9f3f1] border px-4 py-2 rounded-xl w-full text-[#2B1700] ${
              errors.no_wa ? "border-red-500" : "border-[#d6b6aa]"
            }`}
          />
          {errors.no_wa && (
            <p className="text-red-600 text-sm mt-1">{errors.no_wa}</p>
          )}
          <input
            type="text"
            name="nama_ig"
            value={formData.nama_ig}
            onChange={handleInputChange}
            placeholder="Nama Instagram"
            className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="border border-[#652B19] text-[#652B19] px-6 py-2 rounded-xl hover:bg-[#f5e9e5] transition"
          >
            Batal
          </button>
          <button
            onClick={handleTambahPengacara}
            className="bg-[#652B19] text-white px-6 py-2 rounded-xl hover:bg-[#4a1e12] transition"
          >
            Tambah Pengacara
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTambahLawyer; 