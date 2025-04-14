import React from 'react';
import { FaBars, FaEnvelope, FaUser } from 'react-icons/fa';  

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <button onClick={toggleSidebar} className="text-2xl text-onSurface">
        <FaBars />
      </button>
      <div className="flex items-center space-x-4 ">
        <FaEnvelope className="text-gray-500" />
        <FaUser className="text-gray-500" />
      </div>
    </div>
  );
};

export default Navbar;
