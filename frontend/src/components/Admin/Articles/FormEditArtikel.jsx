import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import "react-quill/dist/quill.snow.css";

const FormEditArtikel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState(""); // kategori sebagai id kategori
  const [isi, setIsi] = useState("");
  const [file, setFile] = useState(null);
  const [existingimage_url, setExistingimage_url] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Untuk menampilkan error popup
  const [errorMessage, setErrorMessage] = useState("");
  const [judulAsli, setJudulAsli] = useState("");

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/articles/${id}`);
        const data = response.data;
        setJudul(data.title || "");
        setJudulAsli(data.title || "");
        setKategori(data.kategori_id || "");
        setIsi(data.content || "");
        if (data.image_url) {
          setExistingimage_url(data.image_url);
          setFile(null);
        }
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
        alert("Gagal mengambil data artikel, silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    const fetchKategori = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/articles/categories");
        setKategoriList(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchArtikel();
    fetchKategori();
  }, [id]);

  // Fungsi cek judul duplikat, kecuali artikel ini sendiri
  const checkDuplicateTitle = async (title) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/articles/check-title`, {
        params: { judul: title },
      });
      // API diasumsikan mereturn { exists: true/false, id: idArtikelJikaAda }
      const data = res.data;
      // Kalau judul ada dan id berbeda dengan yang sedang diedit berarti duplikat
      return data.exists && data.id !== Number(id);
    } catch (err) {
      console.error("Gagal cek judul:", err);
      // Kalau gagal cek, anggap tidak duplikat supaya tidak blocking
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Judul Tidak Duplikat hanya jika judul diubah
    if (judul !== judulAsli) {
      const isDuplicate = await checkDuplicateTitle(judul);
      if (isDuplicate) {
        setErrorMessage("Judul artikel sudah ada. Gunakan judul lain.");
        return;
      }
    }

    // Validasi isi minimal 30 karakter tanpa tag HTML
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

    // Reset error jika lolos validasi
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("title", judul);
      formData.append("kategori_id", kategori);
      formData.append("content", isi);

      if (file) {
        formData.append("image_url", file);
      }

      await axios.put(`http://localhost:3000/api/articles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/articles");
      }, 2500);
    } catch (error) {
      console.error("Gagal menyimpan artikel:", error);
      setErrorMessage("Gagal menyimpan artikel, silakan coba lagi.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/articles");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExistingimage_url(""); // reset existing image if new file selected
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
  ];

  const renderPreview = () => {
    if (file && file.type.startsWith("image/")) {
      return <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 w-20 rounded-xl border" />;
    } else if (!file && existingimage_url) {
      return <img src={existingimage_url} alt="Preview" className="mt-2 w-20 rounded-xl border" />;
    } else if (file && file.type === "application/pdf") {
      return <p className="mt-2 italic text-sm text-gray-600">File PDF dipilih: {file.name}</p>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading data artikel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf8] text-[#331a00] flex justify-center items-start p-4 relative">
      {/* Popup sukses */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Artikel berhasil disimpan!</p>
          </div>
        </div>
      )}

      {/* Popup error */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-500 flex flex-col items-center relative max-w-sm">
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-2 right-2 text-red-600 font-bold text-xl leading-none hover:text-red-800"
              aria-label="Close error message"
            >
              ×
            </button>
            <p className="text-red-600 text-lg font-semibold text-center">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white border border-[#964B00] rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 border-b border-[#964B00] pb-2">Edit Artikel</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Judul Artikel</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              className="w-full bg-[#f9efea] border border-[#e0c9ba] p-2 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              required
              className="w-full bg-[#f9efea] border border-[#e0c9ba] p-2 rounded-xl"
            >
              <option value="">Pilih kategori</option>
              {kategoriList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nama_kategori}
                </option>
              ))}
            </select>
          </div>

          <div>
          <label className="block font-semibold mb-1">Gambar</label>
          <div className="flex items-center gap-4">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#964B00] text-white px-6 py-2 rounded-xl"
              >
                Pilih Gambar
              </button>
            </div>
            {renderPreview()}
          </div>
        </div>

          <div>
            <label className="block font-semibold mb-1">Isi Artikel</label>
            <ReactQuill
              theme="snow"
              value={isi}
              onChange={setIsi}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="bg-[#964B00] text-white px-6 py-2 rounded-xl">
              Simpan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditArtikel;
