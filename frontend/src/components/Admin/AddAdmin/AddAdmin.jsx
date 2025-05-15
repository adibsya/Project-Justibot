import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const addAdmin = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handler untuk tambah admin
  const handleTambahAdmin = async () => {
    try {
      // Simulasi API POST request
      const response = await fetch("http://localhost:3000/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/tambahadmin/"); // Redirect ke halaman daftar admin
        }, 2500);
      } else {
        alert("Gagal menambahkan admin. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error saat menambahkan admin:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
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
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto p-6 relative">
      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">
              Admin Berhasil Ditambahkan!
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow border border-[#652B19] w-full max-w-none">
        <h2 className="text-2xl font-bold mb-6 border-b border-[#652B19] pb-2 text-[#2B1700]">
          Tambahkan Admin
        </h2>

        {/* Identitas Admin */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-[#2B1700]">
            Identitas Admin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Admin"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Admin"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password Admin"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="border border-[#652B19] text-[#652B19] px-6 py-2 rounded-xl hover:bg-[#f5e9e5] transition"
          >
            Batal
          </button>
          <button
            onClick={handleTambahAdmin}
            className="bg-[#652B19] text-white px-6 py-2 rounded-xl hover:bg-[#4a1e12] transition"
          >
            Tambah Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default addAdmin;
