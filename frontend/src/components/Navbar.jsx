import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [admin, setAdmin] = useState(null); // state untuk data admin
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Ambil data profil admin saat komponen mount
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await axios.get("/api/admin/profile", { withCredentials: true });
        setAdmin(res.data);
      } catch (err) {
        console.error("Gagal mengambil data admin:", err);
        // Bisa tambah handling error misalnya logout otomatis kalau token expired
      }
    };
    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout", {}, { withCredentials: true });
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("#profile-button")
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md relative z-50">
      <button onClick={toggleSidebar} className="text-2xl text-onSurface">
        <FaBars />
      </button>

      <div className="flex items-center space-x-4">
        <button
          id="profile-button"
          onClick={toggleProfileDropdown}
          className="relative focus:outline-none"
          title={admin?.name || "User Profile"}
        >
          <div className="w-10 h-10 rounded-full bg-[#612A22] flex items-center justify-center shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </button>

        {showProfileDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-4 top-[70px] min-w-[240px] w-fit
                       bg-[#D9CEC5]/40 rounded-2xl border border-gray-300
                       shadow-lg shadow-black/10 p-6 z-50 backdrop-blur-sm
                       transform transition duration-200 ease-out"
          >
            {/* FOTO + NAMA + EMAIL */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div
                className="w-20 h-20 rounded-full border border-gray-300
                           shadow-md flex items-center justify-center bg-[#612A22]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                    1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                    0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <div className="w-full p-3 text-center">
                <p
                  className="font-semibold text-lg text-black whitespace-nowrap"
                  title={admin?.name}
                >
                  {admin?.name || "Loading..."}
                </p>
                <p
                  className="text-sm text-black opacity-70 whitespace-nowrap"
                  title={admin?.email}
                >
                  {admin?.email || ""}
                </p>
              </div>
            </div>

            <hr className="border-gray-400 mb-6" />

            {/* BUTTON DETAIL PROFILE */}
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/admin/profile");
              }}
              className="w-full flex items-center justify-center gap-2
                         bg-white hover:bg-gray-100 transition-colors duration-300
                         text-[#612A22] font-semibold py-3 rounded-xl shadow-md mb-3
                         focus:outline-none focus:ring-2 focus:ring-[#612A22]"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A11.955 11.955 0 0112 15c2.019 0 3.917.5 5.579 1.387M3 10a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
              Detail Profile
            </button>

            {/* BUTTON LOGOUT */}
            <button
              onClick={() => {
                setShowLogoutConfirm(true);
                setShowProfileDropdown(false);
              }}
              className="w-full flex items-center justify-center gap-2
                         bg-[#612A22] hover:bg-[#612A22]/80 transition-colors duration-300
                         text-white font-semibold py-3 rounded-xl shadow-md
                         focus:outline-none focus:ring-2 focus:ring-red-500"
              type="button"
            >
              <FaSignOutAlt className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-80 max-w-full text-center shadow-2xl border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Konfirmasi Logout</h2>
            <p className="mb-6 text-gray-600">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Ya
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;