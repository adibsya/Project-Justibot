import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/me", { withCredentials: true });
        setIsLoggedIn(true);
        setUserData(res.data);
      } catch (err) {
        console.error("Auth check failed:", err.message);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();

    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);
  
  const handleProtectedRoute = (path) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };  

  const handleLogout = async () => {
    try {
      // Misal kamu punya endpoint logout (disarankan)
      await axios.post("/api/logout", {}, { withCredentials: true });

      // Update UI setelah logout
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50 shadow-md font-medium transition-colors duration-300 bg-secondary">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-onPrimary font-bold">
            <Link to={"/"} className="flex items-center space-x-2">
              {/* <img src={assets.logo} alt="Logo" className="w-14" /> */}
              <p className="text-2xl">JUSTIBOT</p>
            </Link>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="md:hidden text-onPrimary focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8 text-onPrimary">
              {/* nav links */}
              <li>
                <NavLink
                  to="/"
                  className="transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-onPrimary after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <p>Home</p>
                </NavLink>
              </li>
              <li onClick={() => handleProtectedRoute("/chatbot")}>
                <NavLink
                  to="/chatbot"
                  className="transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-onPrimary after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <p>Chatbot</p>
                </NavLink>
              </li>
              <li onClick={() => handleProtectedRoute("/document")}>
                <NavLink
                  to="/document"
                  className="transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-onPrimary after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <p>Document</p>
                </NavLink>
              </li>
              <li onClick={() => handleProtectedRoute("/lawyer")}>
                <NavLink
                  to="/lawyer"
                  className="transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-onPrimary after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <p>Lawyer</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/artikel"
                  className="transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-onPrimary after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <p>Artikel</p>
                </NavLink>
              </li>
            </ul>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex justify-between ml-4 px-3 py-1.5 bg-surface text-onSurface rounded-full transition duration-300 ease-in-out hover:bg-gray-300 hover:scale-90"
              >
                <img
                  src={assets.user_icon}
                  className="w-4 mr-2"
                  alt="User Icon"
                />
                <p>Logout</p>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex justify-between ml-4 px-3 py-1.5 bg-surface text-onSurface rounded-full transition duration-300 ease-in-out hover:bg-gray-300 hover:scale-90"
              >
                <img
                  src={assets.user_icon}
                  className="w-4 mr-2"
                  alt="User Icon"
                />
                <p>Login / Signup</p>
              </Link>
            )}
          </div>
        </nav>

        {/* mobile menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-background p-5 rounded-lg text-center z-50`}
        >
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300 
                  ${isActive ? "bg-primary rounded-lg" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li onClick={() => handleProtectedRoute("/chatbot")}>
              <NavLink
                to="/chatbot"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300 
                  ${isActive ? "bg-primary rounded-lg" : ""}`
                }
              >
                Chatbot
              </NavLink>
            </li>
            <li onClick={() => handleProtectedRoute("/document")}>
              <NavLink
                to="/document"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300 
                  ${isActive ? "bg-primary rounded-lg" : ""}`
                }
              >
                Document
              </NavLink>
            </li>
            <li onClick={() => handleProtectedRoute("/lawyer")}>
              <NavLink
                to="/lawyer"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300 
                  ${isActive ? "bg-primary rounded-lg" : ""}`
                }
              >
                Lawyer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/artikel"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300 
                  ${isActive ? "bg-primary rounded-lg" : ""}`
                }
              >
                Artikel
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-onSurface transition duration-300 ease-in-out hover:text-gray-300"
                >
                  Login / Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
