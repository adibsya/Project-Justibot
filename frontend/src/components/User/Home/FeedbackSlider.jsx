import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const feedbacks = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    text: "Justibot sangat membantu saya dalam memahami masalah hukum dengan mudah!",
    role: "Pengacara"
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    text: "Interface yang user-friendly dan respon yang cepat. Sangat direkomendasikan!",
    role: "Mahasiswa Hukum"
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    text: "Dokumen hukum yang dihasilkan sangat akurat dan profesional.",
    role: "Pengusaha"
  },
  {
    id: 4,
    name: "Ahmad Adib",
    rating: 5,
    text: "Interface yang user-friendly dan respon yang cepat. Sangat direkomendasikan!",
    role: "Pengusaha"
  },
  {
    id: 5,
    name: "Daffa Ammar",
    rating: 5,
    text: "Dokumen hukum yang dihasilkan sangat akurat dan profesional.",
    role: "Pengusaha"
  }
];

const FeedbackSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleFeedbacks = [];
  for (let i = 0; i < 3; i++) {
    visibleFeedbacks.push(feedbacks[(startIndex + i) % feedbacks.length]);
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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {visibleFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className='bg-white rounded-xl shadow-xl p-8 relative transform hover:-translate-y-1 transition-all'
            >
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
                        starIndex < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className='text-gray-600 italic'>
                  "{feedback.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlider;
