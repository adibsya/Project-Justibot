import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const LawyersList = () => {
  const [lawyersData, setLawyersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleLawyers, setVisibleLawyers] = useState(6);

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

      {lawyersData.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Belum ada data pengacara.
        </p>
      ) : (
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16 px-4"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          {lawyersData.slice(0, visibleLawyers).map((lawyer) => (
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
                <strong>Lulusan:</strong> {lawyer.asal_univ}
              </p>
              <p className="text-gray-600">
                <strong>Pengalaman:</strong> {lawyer.pengalaman_tahun} tahun
              </p>

              <button
  className="mt-4 text-white bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
  onClick={async () => {
    try {
      const response = await axios.post(`/api/grafik-lawyer/kunjungan/${lawyer.id}`);
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
          ))};
        </motion.div>
      )};

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
