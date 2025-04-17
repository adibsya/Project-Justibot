import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([
    {
      id: 1,
      title:
        "Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?",
      date: "19 Februari 2025",
    },
    {
      id: 2,
      title: "Artikel kedua sebagai contoh",
      date: "20 Februari 2025",
    },
    {
      id: 3,
      title: "Artikel ketiga sebagai contoh",
      date: "21 Februari 2025",
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setArticles(articles.filter((article) => article.id !== articleToDelete));
    setIsDeleteModalOpen(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/admin/articles");
    }, 2500);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/articles/tambah");
  };

  return (
    <div className="min-h-screen bg-surface text-onSurface p-4">
      {/* Pop-up Sukses */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Data berhasil dihapus!</p>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-500 flex flex-col items-center">
            <p className="text-lg font-semibold text-red-600">Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-[#652B19] text-white px-6 py-2 rounded-xl hover:bg-[#652B19]/80"
              >
                Ya
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Artikel</h1>
        <button
          onClick={handleAdd}
          className="p-2 bg-secondary text-white rounded hover:bg-red-900 transition duration-300"
        >
          Tambah Artikel Baru
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="p-4 border rounded-xl shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <div className="h-24 bg-gray-300 rounded mb-4"></div>
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-sm text-gray-500">{article.date}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(article.id)}
                className="p-2 bg-secondary text-white rounded hover:bg-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5L16.862 3.487z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(article.id)}
                className="p-2 bg-secondary text-white rounded hover:bg-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m-4 5v6m-4-6v6m8-6v6M5 6h14l-1 14H6L5 6z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
