import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LawyerRow from './LawyerRow';
import Pagination from './Pagination';
import { CheckCircle } from 'lucide-react'; // Ganti dengan import CheckCircle dari lucide-react

const dummyLawyers = [
  {
    id: 'P0001',
    name: 'Daffa Ammar',
    email: 'daffa@mail.com',
    specialization: 'Hukum Perdata',
    experience: '5 Tahun',
    status: 'Aktif',
  },
];

const DataLawyers = () => {
  const [search, setSearch] = useState('');
  const [lawyers, setLawyers] = useState(dummyLawyers);
  const [showSuccess, setShowSuccess] = useState(false); // Menyimpan status pop-up sukses
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Menyimpan status modal konfirmasi
  const [lawyerToDelete, setLawyerToDelete] = useState(null); // Menyimpan ID pengacara yang akan dihapus
  const navigate = useNavigate();

  const handleAddLawyer = () => {
    navigate('/admin/lawyers/tambah');
  };

  const handleEditLawyer = (id) => {
    navigate(`/admin/lawyers/edit/${id}`);
  };

  const handleDeleteLawyer = (id) => {
    setLawyerToDelete(id); // Simpan ID pengacara yang akan dihapus
    setIsDeleteModalOpen(true); // Tampilkan modal konfirmasi hapus
  };

  const confirmDelete = () => {
    setLawyers(lawyers.filter((lawyer) => lawyer.id !== lawyerToDelete));
    setIsDeleteModalOpen(false);
    setShowSuccess(true); // Menampilkan pop-up sukses
    setTimeout(() => {
      setShowSuccess(false); // Menyembunyikan pop-up setelah 2,5 detik
      navigate('/admin/lawyers'); // Kembali ke halaman DataLawyers setelah penghapusan
    }, 2500);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Menutup modal jika tidak jadi menghapus
  };

  return (
    <div className="p-6">
      {/* Pop-up Sukses */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" /> {/* Ganti FaCheckCircle dengan CheckCircle */}
            <p className="text-green-700 text-lg font-semibold">Data berhasil dihapus!</p>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-500 flex flex-col items-center">
            <p className="text-lg font-semibold text-red-600">Apakah Anda yakin ingin menghapus data ini?</p>
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
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full w-80 focus:outline-none"
        />
        <button
          className="bg-[#652B19] text-white px-4 py-2 rounded"
          onClick={handleAddLawyer}
        >
          Tambah Pengacara
        </button>
      </div>

      <div className="bg-[#F2F2F2] p-4 rounded-xl overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-2">No</th>
              <th>ID Pengacara</th>
              <th>Nama Pengacara</th>
              <th>Email</th>
              <th>Spesialisasi</th>
              <th>Pengalaman</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer, index) => (
              <LawyerRow
                key={index}
                index={index + 1}
                lawyer={lawyer}
                onEdit={() => handleEditLawyer(lawyer.id)}
                onDelete={() => handleDeleteLawyer(lawyer.id)}
              />
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

export default DataLawyers;
