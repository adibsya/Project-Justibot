import React, { useState } from 'react';

const Sidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#ffffff] text-white p-5 transition-all duration-300 border border-gray-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-[#612A22]">JUSTIBOT</h2>
      <ul>
        <li
          className={`p-3 rounded mb-2 ${
            activeItem === 'dashboard' ? 'bg-[#612A22] text-white' : 'bg-white text-[#612A22]'
          } hover:bg-[#77443a] hover:text-white`}
          onClick={() => handleClick('dashboard')}
        >
          Dashboard
        </li>
        <li
          className={`p-3 rounded mb-2 ${
            activeItem === 'daftarPengacara' ? 'bg-[#612A22] text-white' : 'bg-white text-[#612A22]'
          } hover:bg-[#77443a] hover:text-white`}
          onClick={() => handleClick('daftarPengacara')}
        >
          Daftar Pengacara
        </li>
        <li
          className={`p-3 rounded mb-2 ${
            activeItem === 'artikel' ? 'bg-[#612A22] text-white' : 'bg-white text-[#612A22]'
          } hover:bg-[#77443a] hover:text-white`}
          onClick={() => handleClick('artikel')}
        >
          Artikel
        </li>
        <li
          className={`p-3 rounded mb-2 ${
            activeItem === 'analisisChatbot' ? 'bg-[#612A22] text-white' : 'bg-white text-[#612A22]'
          } hover:bg-[#77443a] hover:text-white`}
          onClick={() => handleClick('analisisChatbot')}
        >
          Analisis Chatbot
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
