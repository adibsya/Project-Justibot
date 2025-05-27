import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const ArtikelBisnisdanEkonomi = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "/api/articles?category=Bisnis dan Ekonomi",
        );
        setArticles(response.data);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="text-onSurface py-20">
      <div className="w-full max-w-7xl mx-auto px-4 mt-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Artikel Bisnis dan Ekonomi
        </motion.h2>

        <motion.p
          className="text-base text-gray-600 mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dapatkan pengetahuan baru dengan artikel yang penuh dengan tips,
          tutorial, dan informasi yang mudah dipahami untuk memperkaya wawasan
          Anda.
        </motion.p>

        <hr className="mb-10 border-black" />

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {articles.map((item, index) => (
            <Link
              key={item.id || index}
              to={`/artikel/${item.id}`}
              className="block bg-white rounded-3xl"
            >
              <div className="relative flex flex-col sm:col-span-3 lg:col-span-2 mb-0 sm:mb-4">
                <div className="block relative w-full overflow-hidden rounded-3xl aspect-[4/3]">
                  <img
                    src={item.image_url || "/placeholder.jpg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="w-11/12 mx-auto transform -mt-28">
                  <div className="px-5 flex items-center space-x-4 rtl:space-x-reverse"></div>

                  <div className="p-5 mt-5 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl rounded-3xl flex flex-col flex-grow min-h-60">
                    <h2 className="sm:text-md lg:text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <div
                      className="text-sm text-gray-600 overflow-hidden line-clamp-4 flex-grow"
                      dangerouslySetInnerHTML={{
                        __html: item.content || "<p>Tidak ada isi</p>",
                      }}
                    />
                    <br />
                    <p className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <span className="mt-auto text-sm text-primary font-medium hover:underline">
                      Baca Selengkapnya →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtikelBisnisdanEkonomi;
