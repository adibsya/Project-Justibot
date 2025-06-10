import React, { useState, useEffect } from "react";
import assets from "../../../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";

const FormResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams("");

  useEffect(() => {
    if (!token) {
      setError("Token tidak valid atau telah kedaluwarsa.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setIsLoading(true); // ⬅️ Aktifkan loading

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reset-password",
        { token, password }
      );

      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOkClick = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end pr-32 py-24"
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

      {/* Form */}
      <div className="h-[650px] w-[600px] p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <h2 className="text-5xl text-onSurface font-bold text-start mb-[50px]">
          Atur ulang kata sandi Anda di sini!
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleResetPassword}>
          {/* Password */}
          <div className="space-y-2 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Kata Sandi Baru
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-10"
              placeholder="Masukkan Kata Sandi Baru Anda"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-[30px] cursor-pointer text-gray-500 text-2xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-10"
              placeholder="Konfirmasi Kata Sandi Baru Anda"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-[30px] cursor-pointer text-gray-500 text-2xl"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[250px] py-2 px-4 bg-secondary hover:bg-secondary/80 text-white font-medium rounded-3xl transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Perbarui"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white p-6 rounded-3xl shadow-lg w-[500px] text-center relative">
            <img src={assets.logo_black} alt="Success" className="mx-auto w-20 h-20" />
            <h3 className="text-xl text-onSurface font-semibold mt-4">Reset Password Berhasil!</h3>
            <p className="text-gray-600 mt-2">
              Kata sandi Anda telah diperbarui. Silakan masuk dengan kata sandi baru Anda.
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

export default FormResetPass;
