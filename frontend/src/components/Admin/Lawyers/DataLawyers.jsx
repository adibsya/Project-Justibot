import React, { useState, useEffect } from 'react';
import { Eye, Check, Pencil } from 'lucide-react';

export default function DataLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [rejectModal, setRejectModal] = useState({ open: false, id: null, type: '', reason: '' });
  const [successModal, setSuccessModal] = useState({ open: false, message: '' });
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, type: '', action: null });
  const [activeTab, setActiveTab] = useState('verified');
  const [currentPages, setCurrentPages] = useState({ verified: 1, pendaftaran: 1, edit: 1 });
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:3000/api/lawyers')
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((l, i) => ({
          ...l,
          nama_kantor: i === 0 ? 'Kantor Hukum Pilar Keadilan' : i === 1 ? 'Kantor Hukum Marlina' : 'Kantor Hukum Wicaksono',
          status: i === 1 ? 'pending' : 'verified',
          status_edit: i === 0 ? 'pending' : null,
        }));
        setLawyers(enriched);
      });
  }, []);

  const approveLawyer = (id) => {
    setLawyers((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'verified' } : l)));
    setSuccessModal({ open: true, message: 'Pengacara berhasil diverifikasi.' });
    setTimeout(() => setSuccessModal({ open: false, message: '' }), 2500);
  };

  const approveEdit = (id) => {
    setLawyers((prev) => prev.map((l) => (l.id === id ? { ...l, status_edit: null } : l)));
    setSuccessModal({ open: true, message: 'Edit pengacara berhasil disetujui.' });
    setTimeout(() => setSuccessModal({ open: false, message: '' }), 2500);
  };

  const rejectAction = () => {
    const { id, type } = rejectModal;
    if (type === 'pendaftaran') {
      setLawyers((prev) => prev.filter((l) => l.id !== id));
    } else if (type === 'edit') {
      setLawyers((prev) => prev.map((l) => (l.id === id ? { ...l, status_edit: null } : l)));
    }
    setRejectModal({ open: false, id: null, type: '', reason: '' });
    setSuccessModal({ open: true, message: 'Pengajuan ditolak.' });
    setTimeout(() => setSuccessModal({ open: false, message: '' }), 2500);
  };

  const openConfirmModal = (id, type, action) => {
    setConfirmModal({ open: true, id, type, action });
  };

  const confirmAction = () => {
    const { id, type, action } = confirmModal;
    setConfirmModal({ open: false, id: null, type: '', action: null });
    if (action === 'approve') {
      type === 'edit' ? approveEdit(id) : approveLawyer(id);
    } else {
      handleOpenReject(id, type);
    }
  };

  const handleOpenReject = (id, type) => {
    setRejectModal({ open: true, id, type, reason: '' });
  };

  const getPaginatedData = (data, tab) => {
    const startIndex = (currentPages[tab] - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const verified = lawyers.filter((l) => l.status === 'verified');
  const pending = lawyers.filter((l) => l.status === 'pending');
  const editRequest = lawyers.filter((l) => l.status === 'verified' && l.status_edit === 'pending');

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 text-base">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fadeIn text-center">
        {children}
      </div>
    </div>
  );

  const Table = ({ title, data, type }) => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-[#302620] border-b pb-2">{title}</h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full bg-white text-[#302620] rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#B9A899] text-left text-sm">
              <th className="p-3 font-semibold">Foto</th>
              <th className="p-3 font-semibold">Nama</th>
              <th className="p-3 font-semibold">Nama Kantor</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Preview</th>
              {(type === 'pendaftaran' || type === 'edit') && <th className="p-3 font-semibold">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {getPaginatedData(data, type).map((lawyer, index) => (
              <tr key={lawyer.id} className="border-t border-[#B9A899] text-sm hover:bg-[#F4F0EC]">
                <td className="p-3">
                  <img src={lawyer.foto_profil} alt="foto" className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="p-3">{lawyer.nama}</td>
                <td className="p-3">{lawyer.nama_kantor}</td> {/* Dummy data for Nama Kantor */}
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lawyer.status === 'verified' ? 'bg-[#1E4E59] text-white' : 'bg-[#D9CEC5] text-[#302620]'}`}>
                    {lawyer.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-[#122E40] flex items-center gap-1 font-medium hover:underline">
                    <Eye size={16} /> Lihat
                  </button>
                </td>
                {(type === 'pendaftaran' || type === 'edit') && (
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-[#1E4E59] text-white px-3 py-1 rounded hover:bg-[#163946]"
                      onClick={() => openConfirmModal(lawyer.id, type, 'approve')}
                    >
                      Setujui{type === 'edit' ? ' Edit' : ''}
                    </button>
                    <button
                      className="bg-[#731D2C] text-white px-3 py-1 rounded hover:bg-[#5a1420]"
                      onClick={() => openConfirmModal(lawyer.id, type, 'reject')}
                    >
                      Tolak{type === 'edit' ? ' Edit' : ''}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: totalPages(data) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPages((prev) => ({ ...prev, [type]: index + 1 }))}
              className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                currentPages[type] === index + 1 ? 'bg-[#652B19] text-white' : 'bg-gray-200 text-[#302620] hover:bg-[#D9CEC5]'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-10 bg-white min-h-screen text-base">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded shadow ${
            activeTab === 'verified' ? 'bg-white text-[#652B19] font-bold' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('verified')}
        >
          <Check size={16} /> Terverifikasi
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded shadow ${
            activeTab === 'pendaftaran' ? 'bg-white text-[#652B19] font-bold' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('pendaftaran')}
        >
          <span className="text-yellow-500">🟡</span> Verifikasi Pendaftaran
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded shadow ${
            activeTab === 'edit' ? 'bg-white text-[#652B19] font-bold' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('edit')}
        >
          <Pencil size={16} className="text-red-500" /> Permintaan Edit
        </button>
      </div>

      {activeTab === 'verified' && <Table title="Pengacara Terverifikasi" data={verified} type="verified" />}
      {activeTab === 'pendaftaran' && <Table title="Verifikasi Pendaftaran" data={pending} type="pendaftaran" />}
      {activeTab === 'edit' && <Table title="Permintaan Edit Pengacara" data={editRequest} type="edit" />}

      {successModal.open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-[#1E4E59] text-white px-6 py-4 rounded-xl shadow-xl text-lg font-semibold">
            {successModal.message}
          </div>
        </div>
      )}

      {confirmModal.open && (
        <ModalWrapper>
          <h3 className="font-semibold text-xl mb-2 text-[#302620]">Konfirmasi Aksi</h3>
          <p className="mb-4 text-base">Apakah Anda yakin ingin {confirmModal.action === 'approve' ? 'menyetujui' : 'menolak'} {confirmModal.type === 'pendaftaran' ? 'pendaftaran' : 'permintaan edit'} ini?</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setConfirmModal({ open: false, id: null, type: '', action: null })}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              onClick={confirmAction}
              className="px-4 py-2 bg-[#652B19] text-white rounded hover:bg-[#4b1e13]"
            >
              Ya, Lanjutkan
            </button>
          </div>
        </ModalWrapper>
      )}

      {rejectModal.open && (
        <ModalWrapper>
          <h3 className="font-semibold text-xl mb-2 text-red-600">Tolak {rejectModal.type === 'pendaftaran' ? 'Pendaftaran' : 'Permintaan Edit'}</h3>
          <textarea
            value={rejectModal.reason}
            onChange={(e) => setRejectModal((prev) => ({ ...prev, reason: e.target.value }))}
            placeholder="Tuliskan alasan penolakan..."
            className="w-full border rounded p-3 h-32 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#652B19] focus:border-transparent text-base"
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', transition: 'border-color 0.2s ease' }}
            spellCheck={false}
            autoFocus
          />
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setRejectModal({ open: false, id: null, type: '', reason: '' })}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              onClick={rejectAction}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Kirim Penolakan
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
