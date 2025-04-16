import React from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogout = () => {
    // Hapus token atau data sesi yang relevan
    localStorage.removeItem('authToken'); // Menghapus token jika disimpan di localStorage

    // Arahkan pengguna ke halaman Home setelah logout
    navigate('/'); // Mengarahkan ke halaman Home
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <button onClick={toggleSidebar} className="text-2xl text-onSurface">
        <FaBars />
      </button>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout} // Menambahkan handleLogout untuk logout
          title="Logout"
          className="text-gray-500 hover:text-red-500 text-xl transition"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
