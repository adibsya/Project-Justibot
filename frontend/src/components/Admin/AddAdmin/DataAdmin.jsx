import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Pagination from "./Pagination";

const DataAdmins = () => {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const navigate = useNavigate();

  // Dummy data to add
  const dummyAdmins = [
    { id: "admin001", name: "John Doe", email: "john.doe@example.com" },
    { id: "admin002", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "admin003", name: "Robert Johnson", email: "robert.j@example.com" },
    { id: "admin004", name: "Lisa Brown", email: "lisa.brown@example.com" },
    { id: "admin005", name: "Michael Wong", email: "m.wong@example.com" },
  ];

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admins");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Gagal mengambil data admin:", err);
    }
  };

  // Function to add dummy data
  const addDummyData = () => {
    // Option 1: Add to local state only (will be lost on refresh)
    setAdmins([...admins, ...dummyAdmins]);

    // Option 2: If you want to add to API (uncomment this and comment the above line)
    /*
    dummyAdmins.forEach(async (admin) => {
      try {
        await fetch("http://localhost:3000/api/admins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(admin),
        });
      } catch (err) {
        console.error("Gagal menambahkan admin dummy:", err);
      }
    });
    fetchAdmins(); // Refresh data after adding
    */

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  const handleAddAdmin = () => {
    navigate("/admin/tambahadmin/");
  };

  const handleEditAdmin = (id) => {
    navigate(`/admin/tambahadmin/edit/${id}`);
  };

  const handleDeleteAdmin = (id) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/admins/${adminToDelete}`, {
        method: "DELETE",
      });
      fetchAdmins(); // Refresh data setelah delete
      setIsDeleteModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/tambahadmin/");
      }, 2500);
    } catch (err) {
      console.error("Gagal menghapus admin:", err);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 min-h-screen">
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">
              Data berhasil dihapus!
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
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addDummyData}
          >
            Tambah Dummy Data
          </button>
          <button
            className="bg-[#652B19] text-white px-4 py-2 rounded"
            onClick={handleAddAdmin}
          >
            Tambah Admin
          </button>
        </div>
      </div>
      // Replace the existing table div with this improved version
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
              filteredAdmins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4 text-gray-600">{admin.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEditAdmin(admin.id)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination totalPages={4} currentPage={1} />
      </div>
    </div>
  );
};

export default DataAdmins;
