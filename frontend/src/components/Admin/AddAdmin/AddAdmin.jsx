import React, { useState } from "react";
import {
  CheckCircle,
  User,
  Mail,
  Lock,
  ArrowLeft,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTambahAdmin = async () => {
    try {
      // Validasi form data
      if (!formData.name || !formData.email || !formData.password) {
        alert("Semua field harus diisi!");
        return;
      }

      // Kirim data ke backend
      const response = await fetch("http://localhost:3000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menambahkan admin");
      }

      // Tampilkan pesan sukses
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/dataadmin");
      }, 2500);
    } catch (error) {
      console.error("Error saat menambahkan admin:", error);
      alert(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  // Handler untuk batal
  const handleCancel = () => {
    navigate("/admin/dataadmin/"); // Redirect ke halaman daftar admin
  };

  // Handler untuk perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] p-6 relative">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-green-500 flex flex-col items-center animate-bounceIn max-w-md w-full">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="text-green-600 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Sukses!</h3>
            <p className="text-gray-600 text-center mb-6">
              Admin baru telah berhasil ditambahkan ke sistem
            </p>
            <div className="w-full bg-gray-200 h-1 rounded-full mb-2">
              <div className="bg-green-500 h-1 rounded-full animate-timer"></div>
            </div>
            <p className="text-xs text-gray-400">Mengalihkan halaman...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-[#652B19] transition-colors mr-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Kembali</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Tambah Admin Baru
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-[#652B19] to-[#9c4b31] p-6 text-white">
            <h2 className="text-xl font-medium">Informasi Admin</h2>
            <p className="text-white/80 text-sm mt-1">
              Buat akun admin baru untuk mengakses sistem
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Name field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User size={16} className="mr-2 text-[#652B19]" />
                  Nama Lengkap
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#652B19]/30 focus:border-[#652B19] transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail size={16} className="mr-2 text-[#652B19]" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#652B19]/30 focus:border-[#652B19] transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Lock size={16} className="mr-2 text-[#652B19]" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#652B19]/30 focus:border-[#652B19] transition-all duration-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-500" />
                    ) : (
                      <Eye size={18} className="text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password harus mengandung kombinasi huruf dan angka
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>

                <button
                  onClick={handleTambahAdmin}
                  className="px-5 py-2.5 rounded-xl bg-[#652B19] text-white font-medium hover:bg-[#4a1f12] transition-colors flex items-center"
                >
                  <Plus size={18} className="mr-1" />
                  Tambah Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
