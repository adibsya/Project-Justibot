import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  // Ambil data artikel dari API saat komponen dimuat
  useEffect(() => {
    fetch("http://localhost:3000/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Gagal mengambil data artikel:", error));
  }, []);

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3000/api/articles/${articleToDelete}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setArticles(articles.filter((article) => article.id !== articleToDelete));
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            navigate("/admin/articles");
          }, 2500);
        } else {
          console.error("Gagal menghapus data");
        }
      })
      .catch((error) => console.error("Error:", error));

    setIsDeleteModalOpen(false);
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
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="h-40 w-full object-cover rounded mb-4"
          />
        ) : (
          <div className="h-40 bg-gray-300 rounded mb-4 flex items-center justify-center text-gray-500">
            Tidak ada gambar
          </div>
        )}
        <h3 className="font-bold text-lg">{article.title}</h3>
        <p className="text-sm text-gray-500">{article.date}</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => handleEdit(article.id)}
          className="p-2 bg-secondary text-white rounded hover:bg-red-900"
        >
          ✏️
        </button>
        <button
          onClick={() => handleDelete(article.id)}
          className="p-2 bg-secondary text-white rounded hover:bg-red-900"
        >
          🗑️
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Articles;
