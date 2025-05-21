import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, X, Edit2, Trash2 } from "lucide-react";

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resArticles = await fetch("http://localhost:3000/api/articles");
        if (!resArticles.ok) throw new Error("Gagal mengambil data artikel");
        const articleData = await resArticles.json();
        setArticles(articleData);

        const resCategories = await fetch("http://localhost:3000/api/articles/categories");
        if (!resCategories.ok) throw new Error("Gagal mengambil kategori");
        const kategoriData = await resCategories.json();

        setCategories([{ id: "Semua", nama_kategori: "Semua" }, ...kategoriData]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/articles/${articleToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus artikel");

      setArticles((prev) => prev.filter((a) => a.id !== articleToDelete));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/articles");
      }, 2000);
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => setIsDeleteModalOpen(false);
  const handleEdit = (id) => navigate(`/admin/articles/edit/${id}`);
  const handleAdd = () => navigate("/admin/articles/tambah");

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsDetailModalOpen(true);
  };

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl mx-auto p-6">{children}</div>
    </div>
  );

  const filteredArticles =
    selectedCategory === "Semua"
      ? articles
      : articles.filter(
          (article) => String(article.kategori_id) === String(selectedCategory)
        );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#652B19]">Daftar Artikel</h1>
        <button
          onClick={handleAdd}
          className="bg-[#652B19] hover:bg-[#4d1e13] text-white px-5 py-2 rounded-xl shadow transition"
        >
          ➕ Tambah Artikel
        </button>
      </div>

      <div className="mb-6 max-w-xs">
        <label htmlFor="category-select" className="block mb-2 font-semibold text-[#652B19]">
          Pilih Kategori:
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          id="category-select"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#652B19] focus:border-[#652B19]"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nama_kategori}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="h-12 w-12 border-4 border-b-transparent border-red-600 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <ModalWrapper>
          <div className="bg-white shadow-lg rounded-xl p-6 text-red-600 text-center font-medium">
            <p>{error}</p>
          </div>
        </ModalWrapper>
      )}

      {showSuccess && (
        <ModalWrapper>
          <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center text-green-600 animate-fade-in">
            <CheckCircle className="w-12 h-12 mb-2" />
            <p className="text-lg font-semibold">Data berhasil dihapus!</p>
          </div>
        </ModalWrapper>
      )}

      {isDeleteModalOpen && (
        <ModalWrapper>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Yakin ingin menghapus artikel ini?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Ya
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-lg"
              >
                Tidak
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Modal Detail Artikel */}
      {isDetailModalOpen && selectedArticle && (
        <ModalWrapper>
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden relative w-[90vw] max-w-xl max-h-[95vh] flex flex-col border border-gray-300"
            style={{ maxHeight: "95vh" }}
          >
            {/* Tombol close */}
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 z-10"
              aria-label="Close detail artikel"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Gambar */}
            {selectedArticle.image_url ? (
              <div className="relative w-full h-80">
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 text-lg">
                Tidak ada gambar
              </div>
            )}

            {/* Konten Artikel */}
            <div className="p-8 overflow-y-auto flex-1">
              <h2 className="text-4xl font-bold text-[#652B19] mb-3">
                {selectedArticle.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {new Date(selectedArticle.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                • <span className="italic font-medium text-gray-700">By JustiBot</span>
              </p>
              <div
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: selectedArticle.content || "<p>Tidak ada isi artikel.</p>",
                }}
              />
            </div>
          </div>
        </ModalWrapper>
      )}

      {!isLoading && !error && (
        <div>
          {filteredArticles.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">Tidak ada artikel pada kategori ini.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="bg-white rounded-xl shadow hover:shadow-md transition p-4 cursor-pointer flex flex-col justify-between"
                >
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                      Tidak ada gambar
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(article.id);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md"
                      title="Edit Artikel"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(article.id);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Articles;
