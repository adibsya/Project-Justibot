import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const kantorHukumList = [
  "JustiBot Law Office",
  "Kantor Hukum Merdeka",
  "LegalAid Pro",
];
const bidangHukumList = [
  "Pidana",
  "Perdata",
  "Keluarga",
  "Ketenagakerjaan",
  "Pertanahan",
  "Konstitusi",
  "Perpajakan",
];

const FormPendaftaranLawyer = () => {
  const navigate = useNavigate(); // Create history object
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    telepon: "",
    email: "",
    nomorKTA: "",
    tahunPKPA: "",
    universitas: "",
    organisasi: "",
    nomorLisensi: "",
    afiliasiKantor: "",
    jabatanKantor: "",
    ktaFile: null,
    sertifikatPKPA: null,
    foto: null,
    cv: null,
    suratPernyataan: null,
    bidangHukum: [],
    pengalaman: "",
    kasus: "",
    linkedin: "",
    portofolio: "",
    setuju1: false,
    setuju2: false,
    setuju3: false,
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "bidangHukum") {
      const newBidang = form.bidangHukum.includes(value)
        ? form.bidangHukum.filter((b) => b !== value)
        : [...form.bidangHukum, value];
      setForm({ ...form, bidangHukum: newBidang });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateStep = () => {
    const stepErrors = {};
    if (step === 1) {
      if (!form.nama) stepErrors.nama = "Nama wajib diisi.";
      if (!form.nik) {
        stepErrors.nik = "NIK wajib diisi.";
      } else if (!/^\d{16}$/.test(form.nik)) { 
        stepErrors.nik = "NIK harus terdiri dari 16 angka.";
      }
      if (!form.jenisKelamin) stepErrors.jenisKelamin = "Pilih jenis kelamin.";
      if (!form.tempatLahir) stepErrors.tempatLahir = "Tempat lahir wajib diisi.";
      if (!form.tanggalLahir) stepErrors.tanggalLahir = "Tanggal lahir wajib diisi.";
      if (!form.alamat) stepErrors.alamat = "Alamat wajib diisi.";
      if (!form.telepon) {
        stepErrors.telepon = "Nomor telepon wajib diisi.";
      } else if (!/^\d+$/.test(form.telepon)) { 
        stepErrors.telepon = "Nomor telepon harus terdiri dari angka.";
      }
      if (!form.email) {
        stepErrors.email = "Email wajib diisi.";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) { 
        stepErrors.email = "Email tidak valid.";
      }
    } else if (step === 2) {
      if (!form.nomorKTA) stepErrors.nomorKTA = "Nomor KTA wajib diisi.";
      if (!form.tahunPKPA) stepErrors.tahunPKPA = "Tahun PKPA wajib diisi.";
      if (!form.universitas) stepErrors.universitas = "Universitas wajib diisi.";
      if (!form.nomorLisensi) stepErrors.nomorLisensi = "Nomor lisensi wajib diisi.";
    } else if (step === 4) {
      if (!form.ktaFile) stepErrors.ktaFile = "File KTA wajib diunggah.";
      if (!form.sertifikatPKPA) stepErrors.sertifikatPKPA = "Sertifikat PKPA wajib diunggah.";
      if (!form.foto) stepErrors.foto = "Foto wajib diunggah.";
      if (!form.suratPernyataan) stepErrors.suratPernyataan = "Surat pernyataan wajib diunggah.";
    } else if (step === 6) {
      if (!form.setuju1 || !form.setuju2 || !form.setuju3) {
        stepErrors.persetujuan = "Semua persetujuan wajib dicentang.";
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log(form);
      setShowPopup(true); 
    }
  };

  const closePopup = () => {
    setShowPopup(false); 
    navigate("/"); 
  }

  const inputStyle =
    "p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#731D2C] placeholder:text-sm";
  const labelStyle = "block text-sm font-semibold text-[#122E40] mb-1";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto my-20 p-10 bg-[#FFFFFF] rounded-xl shadow-xl border border-[#D9CEC5]"
      >
        <h2 className="text-3xl font-bold text-center text-[#731D2C] mb-6">
          Form Pendaftaran Lawyer
        </h2>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-[#122E40] mb-4">
              Informasi Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Nama Lengkap *</label>
                <input
                  name="nama"
                  placeholder="Contoh: Tasya Dwiyanti"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.nama && "border-red-500"}`}
                />
                {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
              </div>
              <div>
                <label className={labelStyle}>NIK *</label>
                <input
                  name="nik"
                  placeholder="16 digit NIK sesuai KTP"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.nik && "border-red-500"}`}
                />
                {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
              </div>
              <div>
                <label className={labelStyle}>Jenis Kelamin *</label>
                <select
                  name="jenisKelamin"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.jenisKelamin && "border-red-500"}`}
                >
                  <option value="">Pilih</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin}</p>}
              </div>
              <div>
                <label className={labelStyle}>Tempat Lahir *</label>
                <input
                  name="tempatLahir"
                  placeholder="Contoh: Bangkalan"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.tempatLahir && "border-red-500"}`}
                />
                {errors.tempatLahir && <p className="text-red-500 text-sm">{errors.tempatLahir}</p>}
              </div>
              <div>
                <label className={labelStyle}>Tanggal Lahir *</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.tanggalLahir && "border-red-500"}`}
                />
                {errors.tanggalLahir && <p className="text-red-500 text-sm">{errors.tanggalLahir}</p>}
              </div>
              <div>
                <label className={labelStyle}>Alamat Domisili *</label>
                <input
                  name="alamat"
                  placeholder="Alamat lengkap sekarang"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.alamat && "border-red-500"}`}
                />
                {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
              </div>
              <div>
                <label className={labelStyle}>Nomor Telepon *</label>
                <input
                  name="telepon"
                  placeholder="Contoh: 081234567890"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.telepon && "border-red-500"}`}
                />
                {errors.telepon && <p className="text-red-500 text-sm">{errors.telepon}</p>}
              </div>
              <div>
                <label className={labelStyle}>Email Aktif *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Contoh: email@example.com"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.email && "border-red-500"}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-[#122E40] mb-4">
              Informasi Keprofesian
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Nomor KTA *</label>
                <input
                  name="nomorKTA"
                  placeholder="Contoh: 1234567890"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.nomorKTA && "border-red-500"}`}
                />
                {errors.nomorKTA && <p className="text-red-500 text-sm">{errors.nomorKTA}</p>}
              </div>
              <div>
                <label className={labelStyle}>Tahun PKPA *</label>
                <input
                  name="tahunPKPA"
                  type="number"
                  placeholder="Contoh: 2020"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.tahunPKPA && "border-red-500"}`}
                />
                {errors.tahunPKPA && <p className="text-red-500 text-sm">{errors.tahunPKPA}</p>}
              </div>
              <div>
                <label className={labelStyle}>Universitas *</label>
                <input
                  name="universitas"
                  placeholder="Contoh: Universitas Indonesia"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.universitas && "border-red-500"}`}
                />
                {errors.universitas && <p className="text-red-500 text-sm">{errors.universitas}</p>}
              </div>
              <div>
                <label className={labelStyle}>Organisasi Advokat</label>
                <input
                  name="organisasi"
                  placeholder="Contoh: PERADI"
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Nomor Lisensi *</label>
                <input
                  name="nomorLisensi"
                  placeholder="Contoh: L-09876543"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.nomorLisensi && "border-red-500"}`}
                />
                {errors.nomorLisensi && <p className="text-red-500 text-sm">{errors.nomorLisensi}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Langkah 3: Afiliasi Kantor */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-[#122E40] mb-4">Afiliasi Kantor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Nama Kantor *</label>
                <select
                  name="afiliasiKantor"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.afiliasiKantor && "border-red-500"}`}
                >
                  <option value="">Pilih kantor hukum</option>
                  {kantorHukumList.map((kantor, index) => (
                    <option key={index} value={kantor}>{kantor}</option>
                  ))}
                </select>
                {errors.afiliasiKantor && <p className="text-red-500 text-sm">{errors.afiliasiKantor}</p>}
              </div>
              <div>
                <label className={labelStyle}>Jabatan di Kantor *</label>
                <input
                  name="jabatanKantor"
                  placeholder="Contoh: Senior Partner"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.jabatanKantor && "border-red-500"}`}
                />
                {errors.jabatanKantor && <p className="text-red-500 text-sm">{errors.jabatanKantor}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-[#122E40] mb-4">
              Dokumen Pendukung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>File KTA (PDF) *</label>
                <input
                  type="file"
                  name="ktaFile"
                  accept=".pdf"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.ktaFile && "border-red-500"}`}
                />
                {errors.ktaFile && <p className="text-red-500 text-sm">{errors.ktaFile}</p>}
              </div>
              <div>
                <label className={labelStyle}>Sertifikat PKPA (PDF) *</label>
                <input
                  type="file"
                  name="sertifikatPKPA"
                  accept=".pdf"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.sertifikatPKPA && "border-red-500"}`}
                />
                {errors.sertifikatPKPA && <p className="text-red-500 text-sm">{errors.sertifikatPKPA}</p>}
              </div>
              <div>
                <label className={labelStyle}>Foto Profil (JPG/PNG) *</label>
                <input
                  type="file"
                  name="foto"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.foto && "border-red-500"}`}
                />
                {errors.foto && <p className="text-red-500 text-sm">{errors.foto}</p>}
              </div>
              <div>
                <label className={labelStyle}>CV (Opsional)</label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf"
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Surat Pernyataan (PDF) *</label>
                <input
                  type="file"
                  name="suratPernyataan"
                  accept=".pdf"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.suratPernyataan && "border-red-500"}`}
                />
                {errors.suratPernyataan && <p className="text-red-500 text-sm">{errors.suratPernyataan}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-xl font-semibold text-[#122E40] mb-4">
              Bidang Hukum & Pengalaman
            </h3>
            <div className="mb-6">
              <label className={labelStyle}>Bidang Hukum Dikuasai (Pilih lebih dari satu)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {bidangHukumList.map((bidang, index) => (
                  <label key={index} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="bidangHukum"
                      value={bidang}
                      checked={form.bidangHukum.includes(bidang)}
                      onChange={handleChange}
                    />
                    <span>{bidang}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Pengalaman Praktik Hukum</label>
                <textarea
                  name=" pengalaman"
                  rows={4}
                  placeholder="Ceritakan pengalaman Anda"
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Kasus yang Pernah Ditangani</label>
                <textarea
                  name="kasus"
                  rows={4}
                  placeholder="Contoh kasus yang pernah ditangani"
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className={labelStyle}>Link LinkedIn</label>
                <input
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Link Portofolio</label>
                <input
                  name="portofolio"
                  type="url"
                  placeholder="Link ke dokumen atau situs portofolio"
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h3 className="text-xl font-semibold text-[#122E40] mb-4">
              Persetujuan
            </h3>
            <div className="space-y-4">
              <label className="inline-flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="setuju1"
                  checked={form.setuju1}
                  onChange={handleChange}
                />
                <span>Saya menyatakan data yang saya isi adalah benar.</span>
              </label>
              <label className="inline-flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="setuju2"
                  checked={form.setuju2}
                  onChange={handleChange}
                />
                <span>Saya bersedia mengikuti proses verifikasi sesuai ketentuan.</span>
              </label>
              <label className="inline-flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="setuju3"
                  checked={form.setuju3}
                  onChange={handleChange}
                />
                <span>Saya menyetujui kebijakan privasi dan ketentuan layanan.</span>
              </label>
              {errors.persetujuan && (
                <p className="text-red-500 text-sm">{errors.persetujuan}</p>
              )}
            </div>
          </div>
        )}

        {/* Tombol Navigasi */}
        <div className="flex justify-between items-center gap-4 mt-12">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 bg-[#A89C94] text-white rounded-xl font-medium shadow-md hover:bg-[#8c837d] transition-all duration-200"
            >
              Kembali
            </button>
          )}
          {step < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-[#612A22] text-white rounded-xl font-semibold shadow-md hover:bg-[#4e1f1a] transition-all duration-200"
            >
              Lanjut 
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-3 bg-[#612A22] text-white rounded-xl font-semibold shadow-md hover:bg-[#4e1f1a] transition-all duration-200"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Pop-up Notification */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-lg font-bold text-[#612A22]">Form Berhasil Dikirim!</h2>
            <p className="text-gray-700 mt-2">Terima kasih telah mengisi form pendaftaran lawyer.</p>
            <button
              onClick={closePopup}
              className="mt-6 px-6 py-2 bg-[#612A22] text-white rounded-lg hover:bg-[#4e1f1a] transition duration-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPendaftaranLawyer;