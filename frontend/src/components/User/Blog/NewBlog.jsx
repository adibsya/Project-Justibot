import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import axios from "axios";

const NewBlog = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data);
      } catch (err) {
        setError("Gagal mengambil artikel");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  const mainArticles = articles.slice(0, 2);
  const summaryArticles = articles.slice(3, 7);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 bg-onPrimary text-onSurface">
      <div
        className="rounded-2xl p-10 mb-12 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${assets.bg_blog})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl" />
        <div className="relative z-10">
          <motion.h2
            className="text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Artikel Terbaru
          </motion.h2>
          <motion.p
            className="text-xl text-white"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Temukan artikel terbaru terkait informasi hukum yang ada di Indonesia
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Artikel Utama */}
        <div className="lg:col-span-2 space-y-6">
          {mainArticles.map((article) => (
            <Link to={`/artikel/${article.id}`} key={article.id} className="block">
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6 py-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-white mt-2">{article.date}</p>
                  <span className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all">
                    Baca Artikel
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Artikel Ringkasan */}
        <div className="space-y-4">
          {summaryArticles.map((article) => (
            <Link to={`/artikel/${article.id}`} key={article.id} className="block">
              <motion.div
                className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-xl font-semibold line-clamp-2">{article.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{article.date}</p>
                <div className="mt-2 text-sm text-primary font-medium">
                  Baca selengkapnya &rarr;
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
