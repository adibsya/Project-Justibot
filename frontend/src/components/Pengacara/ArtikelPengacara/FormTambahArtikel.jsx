import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { CheckCircle } from "lucide-react";
import "react-quill/dist/quill.snow.css";

const FormTambahArtikel = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [file, setFile] = useState(null);
  const [isi, setIsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/articles/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setErrorMessage("Gagal mengambil kategori.");
        }
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat mengambil kategori.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
    setTanggal(new Date().toISOString().split("T")[0]);
  }, []);

  const checkDuplicateTitle = async (judul) => {
    try {
      const res = await fetch(`/api/articles/check-title?judul=${encodeURIComponent(judul)}`);
      const data = await res.json();
      return data.exists;
    } catch (err) {
      console.error("Gagal cek judul:", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Judul Tidak Duplikat
    const isDuplicate = await checkDuplicateTitle(judul);
    if (isDuplicate) {
      setErrorMessage("Judul artikel sudah ada. Gunakan judul lain.");
      return;
    }

    // Validasi Isi Artikel
    const plainText = isi.replace(/<[^>]+>/g, "").trim();
    if (!plainText || plainText.length < 50) {
      setErrorMessage("Isi artikel harus diisi minimal 50 karakter.");
      return;
    }

    // Validasi File (opsional tapi jika diisi harus gambar)
    if (file && !file.type.startsWith("image/")) {
      setErrorMessage("File yang diunggah harus berupa gambar.");
      return;
    }

    // Clear error
    setErrorMessage("");

    const formData = new FormData();
    formData.append("title", judul);
    formData.append("content", isi);
    formData.append("author", "Admin");
    if (file) formData.append("image_url", file);
    formData.append("kategori_id", kategori);
    formData.append("tanggal", tanggal);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setJudul("");
          setKategori("");
          setFile(null);
          setIsi("");
          setTanggal(new Date().toISOString().split("T")[0]);
          navigate("/pengacara/articles");
        }, 2500);
      } else {
        setErrorMessage("Gagal menyimpan artikel.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat menyimpan artikel.");
    }
  };

  const handleCancel = () => navigate("/pengacara/articles");

  const handleUploadClick = () => fileInputRef.current?.click();

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header", "bold", "italic", "underline", "strike",
    "color", "background", "script", "list", "bullet",
    "indent", "align", "blockquote", "code-block", "link",
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf8] text-[#331a00] flex justify-center items-start p-4 relative">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Artikel berhasil disimpan!</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-500 flex flex-col items-center relative">
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-2 right-2 text-red-600 font-bold text-xl leading-none hover:text-red-800"
              aria-label="Close error message"
            >
              ×
            </button>
            <p className="text-red-600 text-lg font-semibold">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white border border-[#964B00] rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 border-b border-[#964B00] pb-2">Tambahkan Artikel</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div>
            <label className="block font-semibold mb-1">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full bg-[#f9efea] border border-[#e0c9ba] p-2 rounded-xl"
              required
              disabled={loadingCategories}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nama_kategori}</option>
              ))}
            </select>
            {loadingCategories && <p>Loading...</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Tanggal Artikel</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full bg-[#f9efea] border border-[#e0c9ba] p-2 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Gambar</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#964B00] text-white px-6 py-2 rounded-xl"
              >
                Pilih Gambar
              </button>
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mt-2 w-20 object-cover rounded-xl border border-gray-300"
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Isi Artikel</label>
            <ReactQuill
              value={isi}
              onChange={setIsi}
              modules={quillModules}
              formats={quillFormats}
              theme="snow"
              className="bg-white"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-[#964B00] text-white px-6 py-2 rounded-xl">
              Simpan
            </button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTambahArtikel;
