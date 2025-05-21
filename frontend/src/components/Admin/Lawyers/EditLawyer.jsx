// ...import tetap
import React, { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditLawyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    pengalaman_tahun: "",
    asal_univ: "",
    spesialisasi: "",
    deskripsi: "",
    industri: "",
    no_wa: "",
    nama_ig: "",
    file: null,
    foto_profil: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/lawyers/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData((prev) => ({
          ...prev,
          nama: data.nama || "",
          lokasi: data.lokasi || "",
          pengalaman_tahun: data.pengalaman_tahun?.toString() || "",
          asal_univ: data.asal_univ || "",
          spesialisasi: data.spesialisasi || "",
          deskripsi: Array.isArray(data.deskripsi) ? data.deskripsi.join("\n") : data.deskripsi || "",
          industri: data.industri || "",
          no_wa: data.no_wa || "",
          nama_ig: data.nama_ig || "",
          foto_profil: data.foto_profil || "",
          file: null,
        }));
      })
      .catch(err => {
        console.error("Gagal load data pengacara:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prev) => ({ ...prev, file: selectedFile }));
  };

  const handleUploadClick = () => fileInputRef.current.click();
  const handleCancel = () => navigate("/admin/lawyers");

  const validateField = () => {
    const newErrors = {};
    const { no_wa, nama_ig, pengalaman_tahun } = formData;

    if (no_wa && !/^62[1-9][0-9]{7,10}$/.test(no_wa)) {
      newErrors.no_wa = "Nomor WhatsApp tidak valid (harus format Indonesia (62)).";
    }

    if (nama_ig && !/^[a-zA-Z0-9._]{1,30}$/.test(nama_ig)) {
      newErrors.nama_ig = "Username Instagram tidak valid.";
    }

    if (pengalaman_tahun && (!/^\d+$/.test(pengalaman_tahun) || parseInt(pengalaman_tahun) < 0)) {
      newErrors.pengalaman_tahun = "Pengalaman harus berupa angka positif.";
    }

    return newErrors;
  };

  const handleUpdateLawyer = async (e) => {
    e.preventDefault();
    const validationErrors = validateField();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "file" && value) {
        body.append("foto_profil", value);
      } else if (key !== "file" && value !== "") {
        body.append(key, value);
      }
    });

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/lawyers/${id}`,
        body,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/admin/lawyers");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate data.");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto p-6 relative">
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-500 flex flex-col items-center animate-bounceIn">
            <CheckCircle className="text-green-600 w-12 h-12 mb-2 animate-pingOnce" />
            <p className="text-green-700 text-lg font-semibold">Successfully Updated!</p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow border border-[#652B19] w-full max-w-none">
        <h2 className="text-2xl font-bold mb-6 border-b border-[#652B19] pb-2 text-[#2B1700]">Edit Pengacara</h2>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-[#2B1700]">Identitas Pengacara</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={formData.file ? formData.file.name : ""}
                    readOnly
                    className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]"
                    placeholder="No file chosen"
                  />
                </div>
                <button onClick={handleUploadClick} className="bg-[#652B19] text-white px-4 py-2 rounded-xl">
                  Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </div>
              {formData.foto_profil && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Foto Sebelumnya:</p>
                  <img
                    src={formData.foto_profil}
                    alt="Foto Pengacara"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
            <input name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Pengacara" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]" />
            <input name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="Lokasi Pengacara" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]" />
            <div>
              <input name="pengalaman_tahun" value={formData.pengalaman_tahun} onChange={handleChange} placeholder="Pengalaman" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700] w-full" />
              {errors.pengalaman_tahun && <p className="text-red-500 text-sm mt-1">{errors.pengalaman_tahun}</p>}
            </div>
            <input name="asal_univ" value={formData.asal_univ} onChange={handleChange} placeholder="Pendidikan" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl text-[#2B1700]" />
          </div>
        </div>

        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Spesialis Pengacara</h3>
          <input name="spesialisasi" value={formData.spesialisasi} onChange={handleChange} placeholder="Daftar Spesialis" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]" />
        </div>

        <div className="space-y-4 mb-6 border-t border-[#652B19] pt-4">
          <h3 className="text-lg font-semibold text-[#2B1700]">Tentang Pengacara</h3>
          <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Lain-lain" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full h-24 resize-none text-[#2B1700]" />
          <input name="industri" value={formData.industri} onChange={handleChange} placeholder="Bidang Industri" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]" />
          <div>
            <input name="no_wa" value={formData.no_wa} onChange={handleChange} placeholder="Nomor WhatsApp" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]" />
            {errors.no_wa && <p className="text-red-500 text-sm mt-1">{errors.no_wa}</p>}
          </div>
          <div>
            <input name="nama_ig" value={formData.nama_ig} onChange={handleChange} placeholder="Nama Instagram" className="bg-[#f9f3f1] border border-[#d6b6aa] px-4 py-2 rounded-xl w-full text-[#2B1700]" />
            {errors.nama_ig && <p className="text-red-500 text-sm mt-1">{errors.nama_ig}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={handleCancel} className="border border-[#652B19] text-[#652B19] px-6 py-2 rounded-xl hover:bg-[#f5e9e5] transition">Batal</button>
          <button onClick={handleUpdateLawyer} className="bg-[#652B19] text-white px-6 py-2 rounded-xl hover:bg-[#4a1e12] transition">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  );
};

export default EditLawyer;
