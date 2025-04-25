import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="w-full max-w-10xl mx-auto px-16 py-40 grid grid-cols-1 lg:grid-cols-3 gap-10 bg-onPrimary text-onSurface">
      <div className="col-span-1">
        <motion.h2
          className="text-5xl font-bold"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Blog Terbaru
        </motion.h2>
        <motion.p 
        className="text-gray-500 text-xl mt-2 mb-5"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Temukan berita terbaru terkait informasi hukum yang ada di Indonesia
        </motion.p>
        <div className="space-y-4 border-r pr-5 mt-20">
          {articles.slice(3, 7).map((article) => (
            <Link
              to={`/artikel/${article.id}`}
              key={article.id}
              className="block"
            >
              <motion.div
                className="p-4 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{article.date}</p>
                <div className="mt-2 text-sm text-primary font-medium">
                  Baca selengkapnya &rarr;
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex flex-col space-y-6 mt-56">
        {articles.slice(0, 2).map((article) => (
          <Link
            to={`/artikel/${article.id}`}
            key={article.id}
            className="block"
          >
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-5">
                <h3 className="text-white text-2xl font-bold text-center">
                  {article.title}
                </h3>
                <p className="text-white mt-2">{article.date}</p>
                <span className="mt-3 px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all">
                  Baca Artikel
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewBlog;
