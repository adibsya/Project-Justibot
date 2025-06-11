// import React, { useState, useRef, useEffect } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";

// const categories = ["ILMIAH", "OPINI", "BERITA", "FEATURE", "EDUKASI", "REVIEW"];

// const ArticlePage = () => {
//   const [articles, setArticles] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("ILMIAH");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const containerRef = useRef(null);
//   // const location = useLocation();

//   const scrollBy = (offset) => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
//     }
//   };

//   const changeCategory = (direction) => {
//     const currentIndex = categories.indexOf(selectedCategory);
//     let newIndex = currentIndex + direction;

//     if (newIndex < 0) newIndex = categories.length - 1;
//     if (newIndex >= categories.length) newIndex = 0;

//     setSelectedCategory(categories[newIndex]);
//   };

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get("/api/articles");
//         setArticles(response.data);
//       } catch (err) {
//         setError("Gagal mengambil artikel");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   const filteredArticles = articles.filter(
//     (article) => article.kategori === selectedCategory
//   );

//   return (
//     <div className="px-4 py-6 mx-auto text-onSurface max-w-5xl">
//       <motion.h2
//         className="text-3xl py-4 text-center font-bold"
//         initial={{ opacity: 0, y: -100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: false, amount: 0.2 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         Kategori Artikel
//       </motion.h2>

//       {/* Kategori Scroll */}
//       <div className="relative flex items-center justify-center mb-8 max-w-3xl mx-auto">
//         <button
//           onClick={() => {
//             scrollBy(-150);
//             changeCategory(-1);
//           }}
//           className="absolute left-0 p-2 text-gray-500 hover:text-black z-10"
//         >
//           <FaChevronLeft size={16} />
//         </button>

//         <div
//           ref={containerRef}
//           className="flex overflow-x-auto no-scrollbar space-x-8 px-16 text-sm font-medium uppercase justify-center"
//         >
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`whitespace-nowrap pb-1 transition duration-200 ${
//                 selectedCategory === cat
//                   ? "text-xl font-semibold"
//                   : "text-gray-600 hover:text-black opacity-50"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => {
//             scrollBy(150);
//             changeCategory(1);
//           }}
//           className="absolute right-0 p-2 text-gray-500 hover:text-black z-10"
//         >
//           <FaChevronRight size={16} />
//         </button>
//       </div>

//       {/* Konten Artikel */}
//       {loading ? (
//         <p className="text-center text-gray-500">Memuat artikel...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : filteredArticles.length === 0 ? (
//         <p className="text-center text-gray-500">Tidak ada artikel dalam kategori ini.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {filteredArticles.map((article, index) => (
//             <Link to={`/artikel/${article.id}`} key={article.id}>
//               <motion.div
//                 className="flex items-center space-x-4"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: false, amount: 0.2 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <div className="w-48 h-24 bg-gray-300 rounded-lg overflow-hidden shrink-0">
//                   <img
//                     src={article.image_url || "https://via.placeholder.com/150"}
//                     alt={article.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-onSurface text-lg font-semibold leading-tight hover:underline cursor-pointer line-clamp-2">
//                     {article.title}
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">{article.date}</p>
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArticlePage;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const IslamCategoryArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles?category=Islam");
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
          Artikel Islam
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
          <Link to="/artikel/artikel-islam" className="flex items-center">
            <span className="text-md font-medium hover:underline self-start">
              Semua Artikel Islam
            </span>
            <FaArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IslamCategoryArticles;
