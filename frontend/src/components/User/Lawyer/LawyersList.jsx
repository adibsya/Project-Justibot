import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiFilter } from "react-icons/fi";
import axios from "axios";

const LawyersList = () => {
  const [lawyersData, setLawyersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleLawyers, setVisibleLawyers] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get("/api/lawyers");
        setLawyersData(response.data);
      } catch (err) {
        setError("Gagal mengambil data pengacara");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const loadMore = () => {
    setVisibleLawyers((prev) => prev + 6);
  };

  // Filter data
  const filteredLawyers = lawyersData.filter((lawyer) => {
    const matchName = lawyer.nama
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchLokasi = !selectedCity || lawyer.lokasi === selectedCity; // Changed from alamat to lokasi
    const matchSpecialization =
      !selectedSpecialization || lawyer.spesialisasi === selectedSpecialization;
    return matchName && matchLokasi && matchSpecialization;
  });

  // Get unique cities and specializations
  const cities = [...new Set(lawyersData.map((lawyer) => lawyer.lokasi))];
  const specializations = [
    ...new Set(lawyersData.map((lawyer) => lawyer.spesialisasi)),
  ];

  const filterSection = (
    <div className="text-onSurface flex flex-wrap gap-4 items-center justify-center w-full max-w-6xl mx-auto px-4">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama pengacara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* City Filter */}
      <div className="flex-1 min-w-[200px]">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary appearance-none"
        >
          <option value="">Daftar Kantor</option>
          {cities.map((lokasi) => (
            <option key={lokasi} value={lokasi}>
              {lokasi}
            </option>
          ))}
        </select>
      </div>

      {/* Specialization Filter */}
      <div className="flex-1 min-w-[200px]">
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary appearance-none"
        >
          <option value="">Daftar Spesialisasi</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-16">{error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-center text-5xl font-bold pt-20 text-onSurface">
        Daftar Pengacara
      </h1>

      <div className="mt-8 py-4">{filterSection}</div>

      {filteredLawyers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Tidak ada pengacara yang sesuai dengan filter.
        </p>
      ) : (
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16 px-4"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          {filteredLawyers.slice(0, visibleLawyers).map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-background rounded-lg shadow-lg p-6 w-[400px]"
            >
              <h2 className="text-xl font-bold text-onSurface">
                {lawyer.nama}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Bidang Keahlian:</strong> {lawyer.spesialisasi}
              </p>
              <hr className="my-2 border-black" />
              <p className="text-gray-600">
                <strong>Kantor:</strong> {lawyer.asal_univ}
              </p>
              <p className="text-gray-600">
                <strong>Pengalaman:</strong> {lawyer.pengalaman_tahun} tahun
              </p>

              <button
                className="mt-4 text-white bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `/api/grafik-lawyer/kunjungan/${lawyer.id}`
                    );
                    console.log("Response kunjungan:", response.data);

                    if (response.data.success) {
                      // redirect ke halaman profil pengacara
                      window.location.href = `/lawyer/${lawyer.nama}`;
                    } else {
                      alert("Gagal mencatat kunjungan.");
                    }
                  } catch (err) {
                    console.error("Gagal mencatat kunjungan:", err);
                    alert("Terjadi kesalahan saat mencatat kunjungan.");
                  }
                }}
              >
                Cek Profil
              </button>
            </div>
          ))}
        </motion.div>
      )}
      {visibleLawyers < lawyersData.length && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/80"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LawyersList;
