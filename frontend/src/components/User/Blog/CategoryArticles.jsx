import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link, Links } from "react-router-dom";
import axios from "axios";

const CategoryArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 bg-secondary text-surface">
      <motion.h2
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Kategori Artikel
      </motion.h2>
      <div className="flex justify-center items-center mt-10">

      </div>
    </div>
  );
};

export default CategoryArticles;
