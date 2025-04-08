import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const lawyersData = [
  {
    id: 1,
    name: "Nur Rohma Widiya Ningsih, S.T.",
    specialty: "Kriminal / Kejahatan Pidana",
    university: "Universitas Katolik Indonesia",
    experience: "4 Tahun",
    link: "/lawyer-profile/1",
  },
  {
    id: 2,
    name: "Dewi Kartika, S.H.",
    specialty: "Hukum Perdata",
    university: "Universitas Gadjah Mada",
    experience: "6 Tahun",
    link: "/lawyer-profile/2",
  },
  {
    id: 3,
    name: "Rizky Putra, S.H., M.H.",
    specialty: "Hukum Ketenagakerjaan",
    university: "Universitas Indonesia",
    experience: "5 Tahun",
    link: "/lawyer-profile/3",
  },
  {
    id: 4,
    name: "Budi Santoso, S.H.",
    specialty: "Hukum Keluarga",
    university: "Universitas Airlangga",
    experience: "7 Tahun",
  },
  {
    id: 5,
    name: "Siti Aminah, S.H.",
    specialty: "Hukum Pidana",
    university: "Universitas Diponegoro",
    experience: "3 Tahun",
  },
  {
    id: 6,
    name: "Rina Kurniawati, S.H.",
    specialty: "Hukum Perusahaan",
    university: "Universitas Brawijaya",
    experience: "8 Tahun",
  },
  {
    id: 7,
    name: "Hadi Wicaksono, S.H.",
    specialty: "Hukum Tata Negara",
    university: "Universitas Padjadjaran",
    experience: "9 Tahun",
  },
  {
    id: 8,
    name: "Lestari Widodo, S.H.",
    specialty: "Hukum Pajak",
    university: "Universitas Trisakti",
    experience: "5 Tahun",
  },
  {
    id: 9,
    name: "Arif Nugroho, S.H.",
    specialty: "Hukum Agraria",
    university: "Universitas Diponegoro",
    experience: "6 Tahun",
  },
  {
    id: 10,
    name: "Mega Puspita, S.H., M.H.",
    specialty: "Hukum Dagang",
    university: "Universitas Indonesia",
    experience: "7 Tahun",
  },
  {
    id: 11,
    name: "Fajar Setiawan, S.H.",
    specialty: "Hukum Internasional",
    university: "Universitas Gadjah Mada",
    experience: "10 Tahun",
  },
  {
    id: 12,
    name: "Indah Permatasari, S.H.",
    specialty: "Hukum Hak Asasi Manusia",
    university: "Universitas Airlangga",
    experience: "8 Tahun",
  },
];

const LawyersList = () => {
  const [visibleLawyers, setVisibleLawyers] = useState(6);

  const loadMore = () => {
    setVisibleLawyers((prev) => prev + 6);
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-5xl font-bold pt-20 text-onSurface">
        Pengacara Lainnya
      </h1>

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
            <h2 className="text-xl font-bold text-onSurface">{lawyer.name}</h2>
            <p className="text-gray-600 mt-2">
              <strong>Bidang Keahlian:</strong> {lawyer.specialty}
            </p>
            <hr className="my-2 border-black" />
            <p className="text-gray-600">
              <strong>Lulusan:</strong> {lawyer.university}
            </p>
            <p className="text-gray-600">
              <strong>Pengalaman:</strong> {lawyer.experience}
            </p>
            {lawyer.link ? (
              <Link to={lawyer.link}>
                <button className="mt-4 text-white bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]">
                  Cek Profil
                </button>
              </Link>
            ) : (
              <button className="mt-4 text-white bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] opacity-50 cursor-not-allowed">
                Cek Profil
              </button>
            )}
          </div>
        ))}
      </motion.div>

      {visibleLawyers < lawyersData.length && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            className="bg-secondary text-white px-6 py-2 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LawyersList;
