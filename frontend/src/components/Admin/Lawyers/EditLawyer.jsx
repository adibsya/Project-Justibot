import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy data untuk simulasi
const dummyLawyers = [
  { id: "1", name: "Lawyer A", email: "lawyera@example.com", phone: "081234567890", specialization: "Pidana", location: "Jakarta", experience: "5 years", education: "S1 Hukum" },
  { id: "2", name: "Lawyer B", email: "lawyerb@example.com", phone: "089876543210", specialization: "Perdata", location: "Bandung", experience: "8 years", education: "S2 Hukum" },
];

const EditLawyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    education: '',
    specialization: '',
    file: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Ambil data lawyer dari dummy berdasarkan id
    const selectedLawyer = dummyLawyers.find((lawyer) => lawyer.id === id);
    if (selectedLawyer) {
      setFormData({
        name: selectedLawyer.name,
        email: selectedLawyer.email,
        phone: selectedLawyer.phone,
        location: selectedLawyer.location,
        experience: selectedLawyer.experience,
        education: selectedLawyer.education,
        specialization: selectedLawyer.specialization,
        file: null, // Reset file ketika edit
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate('/admin/lawyers'); // redirect ke halaman daftar pengacara
    }, 2500);
  };

  const handleCancel = () => {
    navigate('/admin/lawyers'); // redirect ke halaman daftar pengacara
  };

  const handleUploadClick = () => {
    document.getElementById('file-upload-input').click(); // Men-trigger input file ketika tombol upload diklik
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto p-6 relative">
      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Successfully Updated!</p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow border border-[#652B19] w-full max-w-none">
        <h2 className="text-2xl font-bold mb-6 border-b border-[#652B19] pb-2 text-[#2B1700]">
          Edit Pengacara
        </h2>

        {/* Identitas */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-[#2B1700]">Identitas Pengacara</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 flex gap-4 items-center">
              {/* Kotak input untuk file yang tetap ada di sebelah tombol Upload */}
              <input
                id="file-upload-input"
                type="file"
                className="hidden" // Menyembunyikan input file, hanya tombol upload yang terlihat
                onChange={handleFileChange}
              />
              <div className="flex-grow">
                <input
                  type="text"
                  value={formData.file ? formData.file.name : ''}
                  readOnly
                  className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
                  placeholder="No file chosen"
                />
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#652B19] text-white px-4 py-2 rounded-xl"
              >
                Upload
              </button>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Lokasi Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Pengalaman Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Pendidikan Pengacara"
              className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]"
            />
          </div>
        </div>

        {/* Spesialis */}
        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Spesialis Pengacara</h3>
          <textarea
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Daftar Spesialis"
            className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full h-24 resize-none text-[#2B1700]"
          ></textarea>
        </div>

        {/* Tentang */}
        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Tentang Pengacara</h3>
          <input
            type="text"
            placeholder="Lain-lain"
            className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
          />
          <input
            type="text"
            placeholder="Bidang Industri"
            className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
          />
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
            onClick={handleSubmit}
            className="bg-[#652B19] text-white px-6 py-2 rounded-xl hover:bg-[#4a1e12] transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLawyer;
