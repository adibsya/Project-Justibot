import React, { useState } from "react";

const PROVINSI_LIST = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Bali",
];
const KOTA_LIST = {
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Barat", "Jakarta Timur"],
  "Jawa Barat": ["Bandung", "Bekasi", "Depok"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang"],
  "Jawa Timur": ["Surabaya", "Malang", "Kediri"],
  Bali: ["Denpasar", "Ubud", "Kuta"],
};

export default function FormPendaftaranKantor() {
  const [formData, setFormData] = useState({
    namaKantor: "",
    alamatKantor: "",
    provinsi: "",
    kota: "",
    noTelp: "",
    emailKantor: "",
    medsos: "",
    penanggungJawab: "",
    jabatan: "",
    hpPenanggung: "",
    emailPenanggung: "",
    aktaPendirian: null,
    dokumenNPWP: null,
    fotoKantor: null,
    keterangan: "",
    persetujuan1: false,
    persetujuan2: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      // Reset kota jika provinsi berubah
      if (name === "provinsi") setFormData((f) => ({ ...f, kota: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(formData);
      alert("Form submitted! (Check console for data)");
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-8 mt-20 border border-secondary"
    >
      <h2 className="text-3xl font-bold text-secondary mb-2 text-center tracking-tight">
        Form Pendaftaran Kantor
      </h2>

      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-secondary rounded-full h-2 mb-4 overflow-hidden">
          <div className="bg-secondary h-2 animate-pulse w-full"></div>
        </div>
      )}

      {/* Informasi Kantor */}
      <section>
        <h3 className="text-xl font-semibold text-secondary-600">
          Informasi Kantor Hukum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          <input
            name="namaKantor"
            required
            onChange={handleChange}
            placeholder="Nama Kantor Hukum (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          />
          <input
            name="alamatKantor"
            required
            onChange={handleChange}
            placeholder="Alamat Lengkap Kantor (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          />
          <select
            name="provinsi"
            required
            value={formData.provinsi}
            onChange={handleChange}
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          >
            <option value="">Pilih Provinsi</option>
            {PROVINSI_LIST.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          <select
            name="kota"
            required
            value={formData.kota}
            onChange={handleChange}
            disabled={!formData.provinsi}
            className={`input transition-all focus:ring-2 focus:ring-secondary-400 ${
              !formData.provinsi && "bg-gray-100 text-gray-400"
            }`}
          >
            <option value="">Pilih Kota</option>
            {formData.provinsi &&
              KOTA_LIST[formData.provinsi].map((kota) => (
                <option key={kota} value={kota}>
                  {kota}
                </option>
              ))}
          </select>
          <input
            name="noTelp"
            required
            onChange={handleChange}
            placeholder="No Telp Kantor (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          />
          <input
            name="emailKantor"
            required
            onChange={handleChange}
            placeholder="Email Kantor (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
            type="email"
          />
          <input
            name="medsos"
            onChange={handleChange}
            placeholder="Media Sosial Kantor (opsional)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          />
        </div>
      </section>

      {/* Penanggung Jawab */}
      <section>
        <h3 className="text-xl font-semibold text-secondary-600">
          Informasi Penanggung Jawab Kantor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          <input
            name="penanggungJawab"
            required
            onChange={handleChange}
            placeholder="Nama Lengkap Penanggung Jawab (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          />
          <input
            name="jabatan"
            required
            onChange={handleChange}
            placeholder="Jabatan di Kantor Hukum (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
          />
          <input
            name="hpPenanggung"
            required
            onChange={handleChange}
            placeholder="No HP (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
            type="tel"
          />
          <input
            name="emailPenanggung"
            required
            onChange={handleChange}
            placeholder="Email (wajib)"
            className="input transition-all focus:ring-2 focus:ring-secondary-400"
            type="email"
          />
        </div>
      </section>

      {/* Dokumen Verifikasi */}
      <section>
        <h3 className="text-xl font-semibold text-secondary-600 mb-2 flex items-center gap-2">
          <span role="img" aria-label="document">📄</span>
          Dokumen Pendukung Verifikasi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-secondary-50 border border-secondary-200 rounded-xl p-4">
          <label className="flex flex-col items-start gap-2">
            <span className="font-medium text-secondary-700 flex items-center gap-1">
              <span role="img" aria-label="akta">📝</span>
              Akta Pendirian Kantor <span className="text-red-500">*</span>
            </span>
            <input
              type="file"
              name="aktaPendirian"
              required
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
            />
            <span className="text-xs text-gray-500">Format: PDF/JPG/PNG</span>
          </label>
          <label className="flex flex-col items-start gap-2">
            <span className="font-medium text-secondary-700 flex items-center gap-1">
              <span role="img" aria-label="npwp">💼</span>
              NPWP / SIUP / NIB
            </span>
            <input
              type="file"
              name="dokumenNPWP"
              accept=".pdf,.png,.jpg"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
            />
            <span className="text-xs text-gray-500">Opsional</span>
          </label>
          <label className="flex flex-col items-start gap-2">
            <span className="font-medium text-secondary-700 flex items-center gap-1">
              <span role="img" aria-label="foto">🏢</span>
              Foto Kantor
            </span>
            <input
              type="file"
              name="fotoKantor"
              accept=".jpg,.png"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
            />
            <span className="text-xs text-gray-500">Opsional</span>
          </label>
        </div>
        <div className="mt-4">
          <textarea
            name="keterangan"
            placeholder="Keterangan Tambahan"
            className="textarea textarea-bordered w-full transition-all focus:ring-2 focus:ring-secondary-400"
            onChange={handleChange}
            rows={3}
          />
        </div>
      </section>

      {/* Persetujuan */}
      <section className="space-y-2">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="persetujuan1"
            onChange={handleChange}
            required
            className="accent-secondary-600 mt-1"
          />
          <span>
            Saya menyatakan bahwa data yang saya isi benar & dapat
            dipertanggungjawabkan.
          </span>
        </label>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="persetujuan2"
            onChange={handleChange}
            required
            className="accent-secondary-600 mt-1"
          />
          <span>
            Saya menyetujui bahwa data ini akan diverifikasi oleh pihak Justibot
            sebelum diaktifkan.
          </span>
        </label>
      </section>

      {/* Submit */}
      <button
        type="submit"
        className={`bg-secondary from-secondary-600 to-secondary-400 text-onPrimary py-3 px-8 rounded-lg shadow-lg hover:from-secondary-700 hover:to-secondary-500 transition-all font-semibold text-lg w-full mt-4 ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Mengirim..." : "Submit Form"}
      </button>
    </form>
  );
}
