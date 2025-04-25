import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Artikel = () => {

  const { id } = useParams(); // Mengambil ID artikel dari URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Artikel tidak ditemukan");
      } else {
        setError("Terjadi kesalahan saat mengambil artikel");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchArticle();
}, [id]);

  if (loading) {
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-24 text-onSurface">
      <div className="w-full mx-auto px-12 py-12 flex flex-col lg:flex-row gap-8">
        {/* Konten Utama */}
        <div className="lg:w-2/3 bg-white p-8 shadow-md rounded-lg">
          {/* Breadcrumbs */}
          <p className="text-sm text-gray-500 mb-4">
            <Link to="/blog" className="text-blue-600 hover:underline">Blog</Link> &gt; 
            <span className="text-gray-700"> {article.title}</span>
          </p>
          
          <h1 className="text-3xl font-bold mb-6">
            {article.title}
          </h1>
          
          {/* Gambar Artikel */}
          <img
            src={article.image_url}
            alt="{article.title}"
            className="max-w-[700px] w-full mx-auto rounded-lg p-10"
          />
          
          <p className="text-gray-700 leading-relaxed text-lg" style={{ whiteSpace : "pre-line" }}>
            {article.content}
          </p>
        </div>

        {/* Sidebar Rekomendasi */}
        <aside id="recommendArticles" className="lg:w-1/3 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Rekomendasi untuk Anda</h2>
          <ul className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <li key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?
                  </p>
                  <p className="text-xs text-gray-500">19 Februari 2025</p>
                </div>
              </li>
            ))}
          </ul>
          <Link 
            to="/blog?scrollTo=recommendations" 
            className="text-blue-600 text-sm mt-4 cursor-pointer hover:underline inline-block"
          >
            Lihat Selengkapnya →
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Artikel;
