import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";
import axios from "axios";

const RegisterForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleOkClick = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setIsModalOpen(true);
    } catch (error) {
      setError(error.response?.data?.message || "Registrasi gagal. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-cover flex items-center px-4 sm:px-8 md:px-16 lg:pr-32 lg:justify-end justify-center py-20"
      style={{
        backgroundImage: `url(${assets.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Loading Spinner */}
            {isLoading && (
              <div className="fixed top-14 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <ThreeDots height={80} width={80} radius="9" color="#612A22" ariaLabel="loading" visible />
              </div>
            )}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[600px] h-auto p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <h2 className="text-onSurface text-3xl sm:text-4xl md:text-5xl font-bold text-start mb-6 sm:mb-[70px]">
          Buat akun JustiBot Anda di sini!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Masukkan Nama Lengkap Anda"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 ">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Masukkan Alamat Email Anda"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Kata Sandi
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-10"
              placeholder="Masukkan Kata Sandi Anda"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-[30px] cursor-pointer text-gray-500 text-2xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-10"
              placeholder="Konfirmasi Kata Sandi Anda"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-[30px] cursor-pointer text-gray-500 text-2xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[250px] py-2 px-4 bg-secondary hover:bg-secondary/80 text-white font-medium rounded-3xl transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
            >
              Daftar
            </button>
          </div>
          <hr className="border-gray-400" />
          <div className="text-center mt-4">
            <h4 className="text-gray-600">
              Sudah memiliki akun?{" "}
              <Link
                to="/login"
                className="text-secondary underline hover:text-secondary/80 transition-colors duration-200"
              >
                Klik di sini!
              </Link>
            </h4>
          </div>
        </form>
      </div>
      
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
            <div className="bg-white p-6 rounded-3xl shadow-lg w-[500px] text-center relative">
              <img
                src={assets.logo_black}
                alt="Success"
                className="mx-auto w-20 h-20"
              />
              <h3 className="text-xl text-onSurface font-semibold mt-4">
                Registrasi Berhasil!
              </h3>
              <p className="text-gray-600 mt-2">
                Silakan cek email Anda untuk verifikasi dan login ke akun Anda.
              </p>
              <button
                className="mt-4 px-6 py-2 bg-secondary text-white rounded-3xl hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
                onClick={handleOkClick}
              >
                OK
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default RegisterForm;
