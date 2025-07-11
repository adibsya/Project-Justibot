import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarPengacara = ({ isOpen }) => {
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
        <Link to="/pengacara/dashboard">
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

        <Link to="/pengacara/articles">
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

        <Link to="/pengacara/data-diri">
          <li
            className={`p-3 rounded mb-2 ${
              location.pathname === "/admin/articles"
                ? "bg-[#612A22] text-white"
                : "bg-white text-[#612A22]"
            } hover:bg-[#77443a] hover:text-white cursor-pointer`}
            onClick={() => handleClick("artikel")}
          >
            Data Diri
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SidebarPengacara;