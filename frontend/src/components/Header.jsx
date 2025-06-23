import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Navigation Links Component
const NavigationItems = ({ handleProtectedRoute, isMobile, toggleMenu = () => {} }) => {
  const navItems = [
    { path: "/", label: "Beranda", protected: false },
    { path: "/chatbot", label: "Chatbot", protected: true },
    { path: "/document", label: "Dokumen", protected: true },
    { path: "/lawyer", label: "Pengacara", protected: true },
    { path: "/artikel", label: "Artikel", protected: false },
  ];

  const linkClass = isMobile
    ? "block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300"
    : "transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-onPrimary after:w-0 after:transition-all after:duration-300 hover:after:w-full";

  return navItems.map((item) => (
    <li key={item.path} onClick={() => item.protected && handleProtectedRoute(item.path)}>
      <NavLink
        to={item.path}
        onClick={toggleMenu}
        className={({ isActive }) =>
          `${linkClass} ${isMobile && isActive ? "bg-primary rounded-lg" : ""}`
        }
      >
        <p>{item.label}</p>
      </NavLink>
    </li>
  ));
};

// Profile Button Component
const ProfileButton = ({ onClick, title }) => (
  <button
    id="profile-button"
    onClick={onClick}
    className="ml-4 rounded-full w-10 h-10 flex items-center justify-center bg-transparent border border-gray-300 shadow-sm hover:shadow-md transition focus:outline-none"
    aria-haspopup="true"
    title={title}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </button>
);

// Profile Dropdown Component
const ProfileDropdown = ({ userData, setShowProfileDropdown, setShowLogoutConfirm, navigate, dropdownRef }) => (
  <div
    ref={dropdownRef}
    className="absolute right-0 mt-2 top-[110%] min-w-[240px] w-fit bg-[#D9CEC5]/40 rounded-2xl border border-gray-300 shadow-lg shadow-black/10 p-6 z-50 transform transition duration-200 ease-out"
  >
    <div className="flex flex-col items-center space-y-4 mb-6">
      <div className="w-20 h-20 rounded-full border border-white-300 shadow-md flex items-center justify-center bg-[#612A22]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div className="w-full p-3 text-center">
        <p className="font-semibold text-lg text-black whitespace-nowrap">{userData?.name}</p>
        <p className="text-sm text-black opacity-70 whitespace-nowrap">{userData?.email}</p>
      </div>
    </div>

    <hr className="border-gray-400 mb-6" />

    <button
      onClick={() => {
        setShowProfileDropdown(false);
        navigate("/profile");
      }}
      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 transition-colors duration-300 text-[#612A22] font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#612A22] mb-3"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A11.955 11.955 0 0112 15c2.019 0 3.917.5 5.579 1.387M3 10a9 9 0 1118 0 9 9 0 01-18 0z" />
      </svg>
      Detail Profile
    </button>

    <button
      onClick={() => {
        setShowLogoutConfirm(true);
        setShowProfileDropdown(false);
      }}
      className="w-full flex items-center justify-center gap-2 bg-[#612A22] hover:bg-[#612A22]/80 transition-colors duration-300 text-white font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
      </svg>
      Logout
    </button>
  </div>
);

// Logout Confirmation Modal
const LogoutConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-xl w-80 max-w-full text-center shadow-2xl border border-gray-200 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Konfirmasi Logout</h2>
      <p className="mb-6 text-gray-600">Apakah Anda yakin ingin logout?</p>
      <div className="flex justify-center gap-6">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Ya
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
);

// Main Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/me", { withCredentials: true });
        setIsLoggedIn(true);
        setUserData(res.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.closest("#profile-button")) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileDropdown]);

  // const handleProtectedRoute = (path) => {
  //   if (!isLoggedIn) navigate("/login");
  //   else navigate(path);
  // };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("#profile-button")
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);


  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md font-medium bg-secondary">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* ---------- BRAND ---------- */}
        <div className="text-onPrimary font-bold">
          <Link to="/" className="flex items-center space-x-2">
            <p className="text-2xl">JUSTIBOT</p>
          </Link>
        </div>

        {/* ---------- MOBILE: PROFIL + HAMBURGER ---------- */}
        <div className="md:hidden flex items-center gap-4">
          {isLoggedIn && (
            <button
              id="profile-button"
              onClick={() => setShowProfileDropdown((prev) => !prev)}
              className="rounded-full w-9 h-9 flex items-center justify-center bg-transparent border border-gray-300 shadow-sm hover:shadow-md transition"
              aria-label="Profil"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          )}
          <button
            className="text-onPrimary focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ---------- DESKTOP LINKS & PROFILE ---------- */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8 text-onPrimary">
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={() => handleProtectedRoute("/chatbot")}><NavLink to="/chatbot">Chatbot</NavLink></li>
            <li onClick={() => handleProtectedRoute("/document")}><NavLink to="/document">Document</NavLink></li>
            <li onClick={() => handleProtectedRoute("/lawyer")}><NavLink to="/lawyer">Lawyer</NavLink></li>
            <li><NavLink to="/artikel">Artikel</NavLink></li>
          </ul>

          {isLoggedIn ? (
            <div className="relative">
              <button
                id="profile-button"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
                className="ml-4 rounded-full w-10 h-10 flex items-center justify-center bg-transparent border border-gray-300 shadow-sm hover:shadow-md transition focus:outline-none"
                aria-haspopup="true"
                aria-expanded={showProfileDropdown}
                title={userData?.name || "User Profile"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center px-3 py-1.5 bg-surface text-onSurface rounded-full hover:bg-gray-300">
              <img src={assets.user_icon} className="w-4 mr-2" alt="User Icon" />
              <p>Login / Signup</p>
            </Link>
          )}
        </div>
      </nav>

      {/* ---------- MOBILE MENU ---------- */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary text-onPrimary px-4 pt-4 pb-6 space-y-4">
          <ul className="flex flex-col space-y-4">
            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
            <li onClick={() => { handleProtectedRoute("/chatbot"); setIsMenuOpen(false); }}><NavLink to="/chatbot">Chatbot</NavLink></li>
            <li onClick={() => { handleProtectedRoute("/document"); setIsMenuOpen(false); }}><NavLink to="/document">Document</NavLink></li>
            <li onClick={() => { handleProtectedRoute("/lawyer"); setIsMenuOpen(false); }}><NavLink to="/lawyer">Lawyer</NavLink></li>
            <li><NavLink to="/artikel" onClick={() => setIsMenuOpen(false)}>Artikel</NavLink></li>
          </ul>
          {isLoggedIn ? (
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile");
                }}
                className="w-full bg-white text-[#612A22] py-2 px-4 rounded-lg shadow hover:bg-gray-100"
              >
                Profil Saya
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full mt-2 bg-[#612A22] text-white py-2 px-4 rounded-lg shadow hover:bg-[#612A22]/80"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-center mt-4 bg-surface text-onSurface px-4 py-2 rounded-full hover:bg-gray-300">
              Login / Signup
            </Link>
          )}
        </div>
      )}

      {/* ---------- DROPDOWN PROFILE ---------- */}
      {showProfileDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-4 mt-2 top-[70px] min-w-[240px] w-fit bg-[#D9CEC5] rounded-2xl border border-gray-300 shadow-lg shadow-black/10 p-6 z-50 transform transition duration-200 ease-out"
        >
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="w-20 h-20 rounded-full border border-white-300 shadow-md flex items-center justify-center bg-[#612A22]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="w-full p-3 text-center">
              <p className="font-semibold text-lg text-black whitespace-nowrap" title={userData?.name}>
                {userData?.name}
              </p>
              <p className="text-sm text-black opacity-70 whitespace-nowrap" title={userData?.email}>
                {userData?.email}
              </p>
            </div>
          </div>

          <hr className="border-gray-400 mb-6" />

          <button
            onClick={() => {
              setShowProfileDropdown(false);
              navigate("/profile");
            }}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#612A22] font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#612A22] mb-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A11.955 11.955 0 0112 15c2.019 0 3.917.5 5.579 1.387M3 10a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            Detail Profile
          </button>

          <button
            onClick={() => {
              setShowLogoutConfirm(true);
              setShowProfileDropdown(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#612A22] hover:bg-[#612A22]/80 text-white font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-80 max-w-full text-center shadow-2xl border border-gray-200 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Konfirmasi Logout</h2>
            <p className="mb-6 text-gray-600">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-center gap-6">
              <button onClick={() => { setShowLogoutConfirm(false); handleLogout(); }} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
                Ya
              </button>
              <button onClick={() => setShowLogoutConfirm(false)} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;