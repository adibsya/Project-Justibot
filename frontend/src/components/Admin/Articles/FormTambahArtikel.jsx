import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { CheckCircle } from "lucide-react";
import "react-quill/dist/quill.snow.css";

const FormTambahArtikel = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState(null);
  const [isi, setIsi] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/admin/articles");
    }, 2500);
  };

  const handleCancel = () => {
    navigate("/admin/articles");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#fdfaf8] text-[#331a00] flex justify-center items-start p-4 relative">
      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Artikel berhasil disimpan!</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white border border-[#964B00] rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 border-b border-[#964B00] pb-2">Tambahkan Artikel</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Judul */}
          <div>
            <label className="block font-semibold mb-1">Judul Artikel</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan judul artikel"
              className="w-full bg-[#f9efea] border border-[#e0c9ba] p-2 rounded-xl"
              required
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block font-semibold mb-1">Upload Gambar / PDF</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                ref={fileInputRef}
              />
              <input
                type="text"
                readOnly
                value={file ? file.name : ""}
                placeholder="Pilih file..."
                className="w-full bg-[#f9efea] border border-[#e0c9ba] p-2 rounded-xl"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#6e2e12] text-white px-4 py-2 rounded-xl hover:bg-[#531e0c] transition"
              >
                Upload
              </button>
            </div>
          </div>

          {/* Editor */}
          <div>
            <label className="block font-semibold mb-1">Isi Artikel</label>
            <div className="border border-[#e0c9ba] rounded-xl overflow-hidden">
              <ReactQuill
                theme="snow"
                value={isi}
                onChange={setIsi}
                placeholder="Tulis artikel di sini..."
                className="h-[200px] overflow-y-auto"
              />
            </div>
          </div>

          {/* Tombol */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-[#331a00] px-5 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="bg-[#6e2e12] text-white px-5 py-2 rounded-xl hover:bg-[#531e0c] transition"
            >
              Simpan Artikel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTambahArtikel;
