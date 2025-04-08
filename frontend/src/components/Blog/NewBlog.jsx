import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const articles = [
  {
    id: 1,
    title:
      "Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?",
    date: "19 Februari 2025",
    image: assets.articles1,
    link: "/artikel",
  },
  {
    id: 2,
    title:
      "Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?",
    date: "19 Februari 2025",
    image: assets.articles1,
  },
  {
    id: 3,
    title:
      "Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?",
    date: "19 Februari 2025",
    image: assets.articles1,
  },
  {
    id: 4,
    title:
      "Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?",
    date: "19 Februari 2025",
    image: assets.articles1,
  },
  {
    id: 5,
    title:
      "Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?",
    date: "19 Februari 2025",
    image: assets.articles1,
  },
];

const NewBlog = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-10xl mx-auto px-4 py-40 grid grid-cols-1 lg:grid-cols-3 gap-10 bg-onPrimary text-onSurface">
      <div className="col-span-1">
        <h2 className="text-5xl font-bold">Blog Terbaru</h2>
        <p className="text-gray-500 text-xl mt-2 mb-5">
          Temukan berita terbaru terkait informasi hukum yang ada di Indonesia
        </p>
        <div className="space-y-4 border-r pr-5 mt-20">
          {articles.map((article) => (
            <Link to={article.link} key={article.id} className="block">
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

      <div className="col-span-2 flex flex-col space-y-6 mt-44">
        {articles.slice(0, 2).map((article) => (
          <Link to={article.link} key={article.id} className="block">
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={article.image}
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
