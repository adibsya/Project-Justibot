import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCheck, FiX, FiFile } from 'react-icons/fi';


const KantorApproval = () => {
  const [pendingOffices, setPendingOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingOffices();
  }, []);

  const fetchPendingOffices = async () => {
    try {
      console.log('Fetching pending offices...'); // Debug log
      const response = await axios.get('/api/form-pendaftaran-kantor');
      console.log('Response data:', response.data); // Debug log
      setPendingOffices(response.data);
    } catch (error) {
      console.error('Full error:', error); // Debug log
      toast.error('Gagal memuat data pendaftaran');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await axios.patch(`/api/form-pendaftaran-kantor/${id}/status`, { status });
      toast.success(`Pendaftaran berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}`);
      fetchPendingOffices(); // Refresh the list
    } catch (error) {
      console.error('Approval error:', error); // Debug log
      toast.error('Gagal memperbarui status');
    }
  };

  const viewDocument = (document, filename) => {
    const blob = new Blob([document], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  // Add debug info in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Current pending offices:', pendingOffices);
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-between'>
      <h1 className="text-2xl font-bold mb-6">Daftar Kantor Hukum</h1>

      </div>
      
      {pendingOffices.length === 0 ? (
        <p className="text-gray-500">Tidak ada pendaftaran yang menunggu persetujuan</p>
      ) : (
        <div className="grid gap-6">
          {pendingOffices.map((office) => (
            <div key={office.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{office.nama_kantor}</h2>
                  <p className="text-gray-600">{office.alamat}</p>
                  <p className="text-gray-600">{office.kota}, {office.provinsi}</p>
                  <p className="text-gray-600">Email: {office.email}</p>
                  <p className="text-gray-600">Telepon: {office.no_telepon}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Dokumen:</h3>
                  <button
                    onClick={() => viewDocument(office.akta_pendirian_kantor, 'akta.pdf')}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FiFile className="mr-2" /> Akta Pendirian
                  </button>
                  {office.dokumen_npwp && (
                    <button
                      onClick={() => viewDocument(office.dokumen_npwp, 'npwp.pdf')}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FiFile className="mr-2" /> NPWP
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleApproval(office.id, 'rejected')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <FiX className="mr-2" /> Tolak
                </button>
                <button
                  onClick={() => handleApproval(office.id, 'approved')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <FiCheck className="mr-2" /> Setujui
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KantorApproval;