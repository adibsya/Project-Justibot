import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLocalAdmin, setIsLocalAdmin] = useState(false);

  // Fetch admin data when component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);

        // First check if this is a local admin
        const localAdmins = JSON.parse(
          localStorage.getItem("localAdmins") || "[]"
        );
        const localAdmin = localAdmins.find((admin) => admin.id === id);

        if (localAdmin) {
          // It's a local admin
          setFormData({
            name: localAdmin.name,
            email: localAdmin.email,
            password: localAdmin.password || "",
          });
          setIsLocalAdmin(true);
        } else {
          // Fetch from API with credentials
          const response = await fetch(`http://localhost:3000/api/admin/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch admin data");
          }

          const apiAdmin = await response.json();
          setFormData({
            name: apiAdmin.name,
            email: apiAdmin.email,
            password: "",
          });
          setIsLocalAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Gagal mengambil data admin: " + error.message);
        navigate("/admin/dataadmin/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [id, navigate]);

  const handleUpdateAdmin = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.email) {
        alert("Nama dan email harus diisi");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Format email tidak valid");
        return;
      }

      // Create request body
      const requestBody = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        requestBody.password = formData.password;
      }

      // Update via API
      const response = await fetch(`http://localhost:3000/api/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update admin");
      }

      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/dataadmin/");
      }, 2500);
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("Gagal mengupdate data admin: " + error.message);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate("/admin/dataadmin/");
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">
              Admin berhasil diupdate!
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Edit Admin</h1>

        {isLocalAdmin && (
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
            Mengedit data admin lokal
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#652B19]"
            placeholder="Masukkan nama"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#652B19]"
            placeholder="Masukkan email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Password{" "}
            {!isLocalAdmin && "(Biarkan kosong jika tidak ingin mengubah)"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#652B19]"
            placeholder="Masukkan password"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleUpdateAdmin}
            className="px-6 py-2 bg-[#652B19] text-white rounded hover:bg-[#652B19]/80"
          >
            Update Admin
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;