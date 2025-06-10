import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const LingkunganCategoryArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles?category=Hukum Lingkungan");
        setArticles(response.data);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="text-onSurface">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Artikel Lingkungan
        </motion.h2>

        <motion.p
          className="text-base text-gray-600 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Temukan artikel-artikel dengan pendekatan ilmiah yang mendalam,
          berdasarkan data dan analisis terpercaya.
        </motion.p>

        <hr className="mb-10 border-black" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative overflow-hidden">
            <div className="flex">
              {articles.map((item, index) => (
                <div
                  key={item.id || index}
                  className="px-2 w-full sm:w-1/2 md:w-1/3 xl:w-1/4 flex-shrink-0"
                >
                  <Link
                    to={`/artikel/${item.id}`}
                    className="block bg-white rounded-lg overflow-hidden h-[300px] border border-gray-200"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={item.image_url || "/placeholder.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col h-[260px]">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 overflow-hidden line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(item.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <span className="mt-3 text-sm text-primary font-medium hover:underline self-start">
                        Baca Selengkapnya →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 mr-4">
          <Link to="/artikel/artikel-lingkungan" className="flex items-center">
            <span className="text-md font-medium hover:underline self-start">
              Semua Artikel Lingkungan
            </span>
            <FaArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LingkunganCategoryArticles;
