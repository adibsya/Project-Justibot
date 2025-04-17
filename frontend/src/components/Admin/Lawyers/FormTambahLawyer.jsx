import React, { useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FormTambahLawyer = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    file: null, // Menyimpan file yang dipilih
  });
  const fileInputRef = useRef(null); // Referensi ke input file
  const navigate = useNavigate();

  // Handler untuk tambah pengacara
  const handleTambahPengacara = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/admin/lawyers'); // redirect ke halaman daftar pengacara
    }, 2500);
  };

  // Handler untuk batal
  const handleCancel = () => {
    navigate('/admin/lawyers'); // redirect ke halaman daftar pengacara
  };

  // Handler untuk perubahan file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      file: selectedFile,
    });
  };

  // Fungsi untuk membuka dialog file
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Membuka file dialog
    }
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto p-6 relative">
      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Successfully!</p>
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
              {/* Kotak input untuk nama file yang dipilih */}
              <div className="flex-grow">
                <input
                  type="text"
                  value={formData.file ? formData.file.name : ''}
                  readOnly
                  className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
                  placeholder="No file chosen"
                />
              </div>

              {/* Tombol untuk membuka dialog file, ditempatkan di sebelah kanan */}
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#652B19] text-white px-4 py-2 rounded-xl"
              >
                Upload
              </button>

              {/* Input file tersembunyi */}
              <input
                id="file-upload-input"
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
            </div>
            <input
              type="text"
              placeholder="Nama Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="text"
              placeholder="Lokasi Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="text"
              placeholder="Pengalaman Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="text"
              placeholder="Pendidikan Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
          </div>
        </div>

        {/* Spesialis */}
        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Spesialis Pengacara</h3>
          <textarea
            placeholder="Daftar Spesialis"
            className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full h-24 resize-none text-[#2B1700]"></textarea>
        </div>

        {/* Tentang */}
        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Tentang Pengacara</h3>
          <input
            type="text"
            placeholder="Lain-lain"
            className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
          />
          <input
            type="text"
            placeholder="Bidang Industri"
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
