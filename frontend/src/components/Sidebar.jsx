import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#ffffff] text-white p-5 transition-all duration-300 border border-gray-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-[#612A22]">JUSTIBOT</h2>
      <ul>
        <Link to="/admin/dashboard">
          <li
            className={`p-3 rounded mb-2 ${
              location.pathname === "/admin/dashboard"
                ? "bg-[#612A22] text-white"
                : "bg-white text-[#612A22]"
            } hover:bg-[#77443a] hover:text-white cursor-pointer`}
            onClick={() => handleClick("dashboard")}
          >
            Dashboard
          </li>
        </Link>

        <Link to="/admin/lawyers">
          <li
            className={`p-3 rounded mb-2 ${
              location.pathname === "/admin/lawyers"
                ? "bg-[#612A22] text-white"
                : "bg-white text-[#612A22]"
            } hover:bg-[#77443a] hover:text-white cursor-pointer`}
            onClick={() => handleClick("daftarPengacara")}
          >
            Daftar Pengacara
          </li>
        </Link>

        <Link to="/admin/articles">
          <li
            className={`p-3 rounded mb-2 ${
              location.pathname === "/admin/articles"
                ? "bg-[#612A22] text-white"
                : "bg-white text-[#612A22]"
            } hover:bg-[#77443a] hover:text-white cursor-pointer`}
            onClick={() => handleClick("artikel")}
          >
            Artikel
          </li>
        </Link>

        <Link to="/admin/dataadmin">
          <li
            className={`p-3 rounded mb-2 ${
              location.pathname === "/admin/dataadmin"
                ? "bg-[#612A22] text-white"
                : "bg-white text-[#612A22]"
            } hover:bg-[#77443a] hover:text-white cursor-pointer`}
            onClick={() => handleClick("DataAdmin")}
          >
            Tambah Admin
          </li>
        </Link>

        <Link to="/admin/StatistikChatbot">
          <li
            className={`p-3 rounded mb-2 ${
              location.pathname === "/admin/StatistikChatbot"
                ? "bg-[#612A22] text-white"
                : "bg-white text-[#612A22]"
            } hover:bg-[#77443a] hover:text-white cursor-pointer`}
            onClick={() => handleClick("analisisChatbot")}
          >
            Statistik Chatbot
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
