import React, { useState } from "react";

const Articles = () => {
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
      title: "Artikel kedua sebagai contoh",
      date: "20 Februari 2025",
    },
    {
      id: 4,
      title: "Artikel kedua sebagai contoh",
      date: "20 Februari 2025",
    },
    {
      id: 5,
      title: "Artikel kedua sebagai contoh",
      date: "20 Februari 2025",
    },
    {
      id: 6,
      title: "Artikel kedua sebagai contoh",
      date: "20 Februari 2025",
    },
  ]);

  const handleDelete = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  const handleEdit = (id) => {
    const newTitle = prompt("Masukkan judul baru:");
    const newDate = prompt("Masukkan tanggal baru (contoh: 21 Februari 2025):");
    if (newTitle && newDate) {
      const updatedArticles = articles.map((article) =>
        article.id === id
          ? { ...article, title: newTitle, date: newDate }
          : article,
      );
      setArticles(updatedArticles);
    } else {
      alert("Judul dan tanggal harus diisi!");
    }
  };

  const handleAdd = () => {
    const newTitle = prompt("Masukkan judul artikel:");
    const newDate = prompt(
      "Masukkan tanggal artikel (contoh: 21 Februari 2025):",
    );
    if (newTitle && newDate) {
      const newArticle = {
        id: articles.length + 1,
        title: newTitle,
        date: newDate,
      };
      setArticles([...articles, newArticle]);
    } else {
      alert("Judul dan tanggal harus diisi!");
    }
  };

  return (
    <div className="min-h-screen bg-surface text-onSurface p-4">
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
