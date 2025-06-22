import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Pencil, Trash2 } from 'lucide-react';
import Pagination from '../Lawyers/Pagination';

const ApprovalPengacara = () => {
  const [search, setSearch] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lawyerToDelete, setLawyerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/lawyers');
      const data = await res.json();
      setLawyers(data);
    } catch (err) {
      console.error('Gagal mengambil data pengacara:', err);
    }
  };

  const handleAddLawyer = () => {
    navigate('/admin/lawyers/tambah');
  };

  const handleEditLawyer = (id) => {
    navigate(`/admin/lawyers/edit/${id}`);
  };

  const handleDeleteLawyer = (id) => {
    setLawyerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/lawyers/${lawyerToDelete}`, {
        method: 'DELETE',
      });
      fetchLawyers(); // Refresh data setelah delete
      setIsDeleteModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/lawyers');
      }, 2500);
    } catch (err) {
      console.error('Gagal menghapus pengacara:', err);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Data berhasil dihapus!</p>
          </div>
        </div>
      )}

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
          placeholder="Search nama pengacara"
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
        <table className="w-full text-center">
          <thead>
            <tr className="text-sm text-gray-600 text-center">
              <th className="py-2">No</th>
              <th className="px-6">Foto</th>
              <th className="w-44">Nama</th>
              <th className="w-32">Lokasi</th>
              <th className="w-36">Spesialisasi</th>
              <th className="w-24">Pengalaman</th>
              <th>Universitas</th>
              <th>No. WA</th>
              <th>Instagram</th>
              <th>Deskripsi</th>
              <th>Industri</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredLawyers.map((lawyer, index) => (
              <tr key={lawyer.id} className="border-t text-sm">
                <td className="py-2">{index + 1}</td>
                <td>
                  <img
                    src={lawyer.foto_profil}
                    alt="Profil"
                    className="w-10 h-10 ml-4 rounded-full object-cover"
                  />
                </td>
                <td>{lawyer.nama}</td>
                <td>{lawyer.lokasi}</td>
                <td>{lawyer.spesialisasi}</td>
                <td>{lawyer.pengalaman_tahun} Tahun</td>
                <td>{lawyer.asal_univ}</td>
                <td>{lawyer.no_wa}</td>
                <td>{lawyer.nama_ig}</td>
                <td>
                  <ul className="list-disc pl-4 text-left">
                    {lawyer.deskripsi?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>{lawyer.industri}</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditLawyer(lawyer.nama)}
                      title="Edit"
                      className="p-2 rounded hover:bg-[#652B19]/10 text-[#652B19]"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteLawyer(lawyer.id)}
                      title="Hapus"
                      className="p-2 rounded hover:bg-gray-200 text-red-600"
                    >
                      <Trash2 size={18} />
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

export default ApprovalPengacara
