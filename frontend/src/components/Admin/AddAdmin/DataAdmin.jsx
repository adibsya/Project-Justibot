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
    <div className="p-6">
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
        <button
          className="bg-[#652B19] text-white px-4 py-2 rounded"
          onClick={handleAddAdmin}
        >
          Tambah Admin
        </button>
      </div>

      <div className="bg-[#F2F2F2] p-4 rounded-xl overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="text-sm text-gray-600 text-center">
              <th className="py-2">No</th>
              <th className="px-6">ID</th>
              <th className="w-44">Nama</th>
              <th className="w-32">Email</th>
              <th className="w-36">Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, index) => (
              <tr key={admin.id} className="border-t text-sm">
                <td className="py-2">{index + 1}</td>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAdmin(admin.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
