import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";

const DataAdmins = () => {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Modifikasi di DataAdmin.jsx
  const fetchAdmins = async () => {
    try {
      console.log("Memulai fetch admin data...");

      // Get data from API dengan credentials
      const res = await fetch("http://localhost:3000/api/admin", {
        credentials: "include",
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Response error:", errorText);
        throw new Error("Gagal mengambil data admin dari server");
      }

      const apiData = await res.json();
      console.log("Data admin berhasil diambil:", apiData.length, "item");
      setAdmins(apiData);
    } catch (err) {
      console.error("Gagal mengambil data admin:", err);
      alert("Gagal mengambil data dari server: " + err.message);
    }
  };

  const handleAddAdmin = () => {
    navigate("/admin/tambahadmin/");
  };

  const handleEditAdmin = (id) => {
    navigate(`/admin/dataadmin/edit/${id}`);
  };

  const handleDeleteAdmin = (id) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Check if we're deleting a local admin
      const localAdmins = JSON.parse(
        localStorage.getItem("localAdmins") || "[]"
      );
      const isLocalAdmin = localAdmins.some(
        (admin) => admin.id === adminToDelete
      );

      if (isLocalAdmin) {
        // Filter out the deleted admin
        const updatedAdmins = localAdmins.filter(
          (admin) => admin.id !== adminToDelete
        );
        localStorage.setItem("localAdmins", JSON.stringify(updatedAdmins));
      } else {
        // Delete from API with credentials
        const response = await fetch(`http://localhost:3000/api/admin/${adminToDelete}`, {
          method: "DELETE",
          credentials: "include", // Add this line
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete admin");
        }
      }

      await fetchAdmins(); // Refresh data after delete
      setIsDeleteModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
    } catch (err) {
      console.error("Gagal menghapus admin:", err);
      alert("Gagal menghapus admin: " + err.message);
    }
};

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  return (
    <div className="p-6 min-h-screen">
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">
              Admin Telah Dihapus!
            </p>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-500 flex flex-col items-center">
            <p className="text-lg font-semibold text-red-600">
              Apakah Anda yakin ingin menghapus data ini?
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-[#652B19] text-white px-6 py-2 rounded-xl hover:bg-[#652B19]/80"
              >
                Ya
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search nama admin"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full w-80 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            className="bg-[#652B19] text-white px-4 py-2 rounded"
            onClick={handleAddAdmin}
          >
            Tambah Admin
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 border-b border-gray-200">
              <th className="px-6 py-4 w-16 font-semibold">No</th>
              <th className="px-6 py-4 w-32 font-semibold">ID</th>
              <th className="px-6 py-4 w-64 font-semibold">Nama</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 w-32 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Tidak ada data admin yang ditemukan
                </td>
              </tr>
            ) : (
              currentItems.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4 text-gray-600">{admin.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEditAdmin(admin.id)}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                      >
                        <Pencil size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 size={14} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredAdmins.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataAdmins;