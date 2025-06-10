import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { motion } from 'framer-motion';
import axios from 'axios';

const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [visibleCards, setVisibleCards] = useState(3);

useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Gagal mengambil data feedback:', error);
    }
  };

  fetchFeedbacks();
}, []);

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
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// ** Revisi: tambah auto sliding **
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= feedbacks.length - visibleCards + 1 ? 0 : nextIndex;
    });
  }, 3000); // geser setiap 3 detik

  return () => clearInterval(interval); // bersihkan interval saat komponen unmount atau dependency berubah
}, [feedbacks.length, visibleCards]);

const nextSlide = () => {
  setCurrentIndex((prevIndex) => {
    const nextIndex = prevIndex + 1;
    return nextIndex >= feedbacks.length - visibleCards + 1 ? 0 : nextIndex;
  });
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) => {
    const nextIndex = prevIndex - 1;
    return nextIndex < 0 ? feedbacks.length - visibleCards : nextIndex;
  });
};

if (feedbacks.length === 0) {
  return (
    <div className='bg-primary w-full min-h-[400px] md:min-h-[600px] lg:min-h-[400px] pb-4 overflow-hidden text-onSurface flex justify-center items-center'>
      <p className='text-white text-xl'>Loading feedback...</p>
    </div>
  );
}

  return (
    <div className='bg-primary w-full min-h-[400px] md:min-h-[600px] lg:min-h-[400px] pb-4 overflow-hidden text-onSurface'>
      <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-8 mb-12'>
        Saran dan kritik dari pengguna
      </h1>

      <div className='relative max-w-6xl mx-auto px-4'>
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all'
        >
          <BiChevronLeft className='w-6 h-6 text-primary' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all'
        >
          <BiChevronRight className='w-6 h-6 text-primary' />
        </button>

        {/* Cards Container */}
        <div className='overflow-hidden p-2'>
          <motion.div
            className='flex'
            animate={{ x: `-${(currentIndex * 100) / visibleCards}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {feedbacks.map((feedback, index) => (
              <div
                key={feedback.id || index}
                className='px-3 w-full md:w-1/2 lg:w-1/3 flex-shrink-0'
              >
                <div className='bg-white rounded-xl p-8 relative transform hover:-translate-y-1 transition-all h-full'>
                  <div className='flex flex-col items-center text-center space-y-4'>
                    <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                      <span className='text-2xl font-bold text-primary'>
                        {feedback.name[0]}
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold text-gray-800'>
                      {feedback.name}
                    </h3>
                    <div className='flex space-x-1'>
                      {[...Array(5)].map((_, starIndex) => (
                        <AiFillStar
                          key={starIndex}
                          className={`w-5 h-5 ${
                            starIndex < feedback.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-gray-600 italic'>"{feedback.feedback}"</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlider;
