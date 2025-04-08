import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Proses Login gagal. Coba lagi.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center px-4 sm:px-8 md:px-16 lg:pr-32 lg:justify-end justify-center py-36"
      style={{
        backgroundImage: `url(${assets.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[600px] h-auto p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <h2 className="text-onSurface text-3xl sm:text-4xl md:text-5xl font-bold text-start mb-6 sm:mb-[70px]">
          Sign in to JustiBot account here!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
              placeholder="Masukkan Alamat Email Anda"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
              placeholder="Masukkan Kata Sandi Anda"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="text-end">
            <Link
              to="/forgot-password"
              className="text-secondary underline hover:text-secondary/80 transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Tampilkan pesan error jika login gagal */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[250px] py-2 px-4 bg-secondary hover:bg-secondary/80 text-white font-medium rounded-3xl transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
            >
              Sign In
            </button>
          </div>
          <hr className="border-gray-400" />
          <div className="text-center mt-4">
            <h4 className="text-gray-600">
              Don't have any account?{" "}
              <Link
                to="/register"
                className="text-secondary underline hover:text-secondary/80 transition-colors duration-200"
              >
                Click here!
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
