import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home_News = () => {
  const data = [
    {
      date: "01 MAY 2023",
      title: "New Rights for Tenants in Housing Law",
      description:
        "Recent changes in housing legislation give tenants more protections against unfair evictions and rent increases.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      date: "15 MAY 2023",
      title: "Understanding Small Claims Court",
      description:
        "A guide to navigating small claims court procedures for disputes under $5000 without hiring an attorney.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y291cnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      date: "22 MAY 2023",
      title: "Employment Contract Essentials",
      description:
        "What every employee should know before signing an employment contract: terms, conditions and red flags.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      date: "05 JUN 2023",
      title: "Intellectual Property Protection",
      description:
        "How creators and entrepreneurs can protect their work through copyrights, trademarks, and patents.",
      image:
        "https://images.unsplash.com/photo-1607703703674-df96af81dffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZWxsZWN0dWFsJTIwcHJvcGVydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

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
      return nextIndex >= data.length - visibleCards + 1 ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? data.length - visibleCards : nextIndex;
    });
  };

  return (
    <div className="bg-onPrimary py-10 relative overflow-hidden">
      {/* Half rounded box with secondary color */}
      <div className="absolute bottom-0 h-1/2 w-full bg-primary rounded-t-3xl"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-2xl font-bold text-gray-800">
            Legal News & Updates
          </h2>
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
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${(currentIndex * 100) / visibleCards}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className={`px-2 w-full md:w-1/2 lg:w-1/3 flex-shrink-0`}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={item.image}
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
                      {item.description}
                    </p>
                    <button className="mt-3 text-sm text-primary font-medium hover:underline self-start">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-6">
          {data.map(
            (_, index) =>
              index <= data.length - visibleCards && (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    currentIndex === index ? "bg-onSurface" : "bg-onPrimary"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home_News;
