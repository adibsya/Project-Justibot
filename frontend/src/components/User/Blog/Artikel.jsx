import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Artikel = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleAndRecommendations = async () => {
      try {
        const articleRes = await axios.get(`/api/articles/${id}`);
        setArticle(articleRes.data);
        const recommendationsBlog = await axios.get("/api/articles");
        const filtered = recommendationsBlog.data.filter(
          (article) => article.id !== parseInt(id),
        );
        setArticles(filtered);
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

    fetchArticleAndRecommendations();
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
            <Link to="/artikel" className="text-blue-600 hover:underline">
              Artikel
            </Link>{" "}
            &gt; <span className="text-gray-700"> {article.title}</span>
          </p>
          <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
          {/* Gambar Artikel */}
          <img
            src={article.image_url}
            alt={article.title}
            className="max-w-[700px] w-full mx-auto rounded-lg p-10"
          />
          <p
            className="text-gray-700 leading-relaxed text-lg"
            style={{ whiteSpace: "pre-line" }}
          >
            {article.content}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Created by Justibot
          </p>
        </div>

        {/* Sidebar Rekomendasi */}
        <aside
          id="recommendArticles"
          className="lg:w-1/3 bg-white p-6 shadow-md rounded-lg sticky top-24 self-start"
        >
          <h2 className="text-xl font-semibold mb-4">Rekomendasi untuk Anda</h2>
          <ul className="flex flex-col justify-between space-y-4">
            {articles.slice(0, 4).map((article) => (
              <li key={article.id} className="flex gap-4 items-stretch">
                <div className="w-40 h-20 bg-gray-300 rounded-md overflow-hidden flex-shrink-0">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between h-20">
                  <Link
                    to={`/artikel/${article.id}`}
                    className="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-3"
                  >
                    {article.title}
                  </Link>
                  <p className="text-sm text-gray-500">{article.date}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/artikel"
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
