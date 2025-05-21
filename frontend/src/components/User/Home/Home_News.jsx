import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Home_News = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "/api/articles/recommendations?page=1&limit=5",
        );
        setArticles(response.data.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Responsif terhadap ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= articles.length - visibleCards + 1 ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? articles.length - visibleCards : nextIndex;
    });
  };

  if (articles.length === 0) {
    return (
      <div className="bg-onPrimary py-10 text-center text-gray-600">
        <p>Loading articles or no articles available.</p>
      </div>
    );
  }

  return (
    <div className="bg-onPrimary py-10 relative overflow-hidden">
      <div className="absolute bottom-0 h-1/2 w-full bg-primary rounded-t-3xl"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Artikel Hukum</h2>
          {articles.length > visibleCards && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-md transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-md transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${(currentIndex * 100) / visibleCards}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {articles.map((item, index) => (
              <div
                key={index}
                className="px-2 w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={item.image_url || "/placeholder.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 overflow-hidden line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 overflow-hidden line-clamp-4 flex-grow">
                      {item.content}
                    </p>
                    <Link
                      to={`/artikel/${item.id}`}
                      className="mt-3 text-sm text-primary font-medium hover:underline self-start"
                    >
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {articles.length > visibleCards && (
          <div className="flex justify-center mt-6">
            {articles.map((_, index) =>
              index <= articles.length - visibleCards ? (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    currentIndex === index ? "bg-onSurface" : "bg-onPrimary"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home_News;
