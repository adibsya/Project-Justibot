import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link, Links } from "react-router-dom";
import axios from "axios";

const RecommendArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("scrollTo") === "recommendations") {
      setTimeout(() => {
        const recommendSection = document.querySelector("#recommendations");
        if (recommendSection) {
          const topOffset = recommendSection.offsetTop - 100;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get(
        `/api/articles/recommendations?page=${page}&limit=6`
      );
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationItems = () => {
    const pages = [];
    if (currentPage > 3) pages.push("««");
    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (currentPage < totalPages - 2) pages.push("»»");

    return pages;
  };

  return (
    <div id="recommendations" className="w-full max-w-6xl mx-auto px-6">
      <motion.h2
        className="text-3xl font-bold mb-8 text-onSurface"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Rekomendasi Untuk Anda
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <Link
          to={`/artikel/${article.id}`}
          key={article.id}
          >
          <motion.div
            key={index}
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-[200px] h-24 bg-gray-300 rounded-lg">
              {article.image_url && (
                <img src={article.image_url} alt={article.title} />
              )}
            </div>
            <div>
              <h3 className="text-onSurface text-lg font-semibold leading-tight hover:underline cursor-pointer">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{article.date}</p>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-3 text-gray-700 text-lg">
        {getPaginationItems().map((page, index) => (
          <span
            key={index}
            className={`cursor-pointer px-3 py-2 rounded-lg ${currentPage === page ? "bg-primary text-white font-bold" : "hover:underline"}`}
            onClick={() => {
              if (page === "««") handlePageChange(1);
              else if (page === "»»") handlePageChange(totalPages);
              else if (typeof page === "number") handlePageChange(page);
            }}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecommendArticles;
