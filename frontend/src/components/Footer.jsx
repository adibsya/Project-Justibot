import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { assets } from "../assets/assets";
import axios from "axios";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    checked: false,
    loading: false
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setAuthState(prev => ({...prev, loading: true}));
        const response = await axios.get("/api/auth/status", { 
          withCredentials: true 
        });
        setAuthState({
          isLoggedIn: response.data.loggedIn,
          checked: true,
          loading: false
        });
      } catch (error) {
        console.error("Error checking auth status:", error);
        setAuthState({
          isLoggedIn: false,
          checked: true,
          loading: false
        });
      }
    };

    checkLoginStatus();
  }, []);

  const handleFAQClick = () => {
    if (location.pathname === "/") {
      const faqElement = document.getElementById("faq");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#faq");
    }
  };

  const submitFeedback = async () => {
    if (!feedback.trim() || !rating) {
      setError("Harap isi feedback dan berikan rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(
        "/api/feedback",
        { rating, feedback },
        { withCredentials: true }
      );
      
      setFeedback("");
      setRating(0);
      setHover(0);
      setFeedbackSent(true);
      
      setTimeout(() => setFeedbackSent(false), 3000);
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      setError(error.response?.data?.message || "Gagal mengirim feedback");
      
      if (error.response?.status === 401) {
        setAuthState({
          isLoggedIn: false,
          checked: true,
          loading: false
        });
        setShowLoginPopup(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (authState.loading || !authState.checked) {
      setError("Sedang memverifikasi status login...");
      return;
    }

    if (!authState.isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    await submitFeedback();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-wrapper bg-onPrimary">
      {/* Main Footer */}
      <footer className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-12 text-onSurface">
        {/* Company Info Section */}
        <div className="footer-company space-y-6">
          <a href="/" className="block w-32 transition-transform hover:scale-105">
            <img
              src={assets.logo_black}
              alt="Logo JustiBot"
              className="w-full h-auto"
            />
          </a>

          <p className="text-sm md:text-base leading-relaxed opacity-90">
            JUSTIBOT Industries Ltd.
            <br />
            Providing reliable legal tech solutions since 1992
          </p>

          <div className="flex space-x-4 mt-6">
            <a
              href="https://www.instagram.com/adibsyaa_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/justibot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/justibot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>

        {/* About Links Section */}
        <div className="footer-links">
          <h6 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
            Tentang
          </h6>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => navigate("/about")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Tentang Kami
              </button>
            </li>
            <li>
              <button
                onClick={handleFAQClick}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/syarat-dan-ketentuan")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Syarat & Ketentuan
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/kebijakan-privasi")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Kebijakan Privasi
              </button>
            </li>
          </ul>
        </div>

        {/* Services Links Section */}
        <div className="footer-services">
          <h6 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
            Layanan
          </h6>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => navigate("/chatbot")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Chatbot
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/document")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Dokumen Hukum
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/lawyer")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Pengacara Hukum
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/artikel")}
                className="text-onSurface hover:text-primary transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                Artikel
              </button>
            </li>
          </ul>
        </div>

        {/* Feedback Form Section */}
        <div className="footer-feedback">
          <h6 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Feedback</h6>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            {/* Rating stars */}
            <div className="form-control mb-4">
              <label className="block text-sm font-medium mb-2 text-onSurface">Rating</label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={`text-2xl transition-colors duration-200 ${
                        ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(rating)}
                      aria-label={`${ratingValue} star`}
                    >
                      <AiFillStar />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-control">
              <textarea
                placeholder="Berikan masukan atau ide artikel Anda untuk Justibot"
                className="text-onSurface/60 w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                rows="3"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-md bg-primary text-white font-medium transition-all hover:bg-opacity-90 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting || authState.loading}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Feedback"}
            </button>

            {feedbackSent && (
              <div className="text-green-600 text-sm flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Terima kasih atas masukan Anda!
              </div>
            )}
          </form>
        </div>
      </footer>

      {/* Login Popup */}
      {showLoginPopup && authState.checked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Harap Login</h3>
            <p className="mb-4">Anda harus login terlebih dahulu untuk memberikan feedback.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  navigate("/login", { state: { from: location.pathname } });
                }}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copyright Footer */}
      <div className="bg-secondary text-onPrimary py-4">
        <div className="container mx-auto text-center text-sm">
          <p>
            Copyright © {currentYear} - All rights reserved by JUSTIBOT
            Industries Ltd
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;