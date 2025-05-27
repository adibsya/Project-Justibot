import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { assets } from "../../../assets/assets";
import axios from "axios";

const Profile = () => {
  const { nama } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await axios.get(`/api/lawyers/${nama}`);
        setLawyer(response.data);
      } catch (err) {
        setError("Pengacara tidak ditemukan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [nama]);

  if (loading) {
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-24 pb-16 text-onSurface">
      <div className="max-w-5xl w-full mx-auto p-12 bg-white shadow-lg rounded-lg mt-6 space-y-10">
        {/* Bagian Profile */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Gambar Profil */}
          <img
            src={lawyer.foto_profil || assets.profile}
            alt={`Foto ${lawyer.nama}`}
            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md object-cover"
          />

          {/* Informasi Profil */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{lawyer.nama}</h1>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <MapPin size={20} /> {lawyer.lokasi || "Tidak tersedia"}
            </div>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <Briefcase size={20} /> {lawyer.pengalaman_tahun || 0} tahun
              pengalaman
            </div>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <GraduationCap size={20} /> {lawyer.asal_univ || "Tidak tersedia"}
            </div>

            <div className="flex gap-8 justify-center">
              {lawyer.no_wa && (
                <a
                  href={`https://wa.me/${lawyer.no_wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-secondary hover:text-primary transition duration-300"
                >
                  <FaWhatsapp size={40} />
                </a>
              )}
              {lawyer.nama_ig && (
                <a
                  href={`https://instagram.com/${lawyer.nama_ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-secondary hover:text-primary transition duration-300"
                >
                  <FaInstagram size={40} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bagian Keahlian */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">
          Keahlian dan Spesialisasi
          </h2>
          <p className="text-gray-700 text-lg mt-2">
            {lawyer.spesialisasi || "Tidak tersedia"}
          </p>
        </div>

        {/* Bagian About */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">Tentang Pengacara</h2>
          {Array.isArray(lawyer.deskripsi) && lawyer.deskripsi.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2 mt-2">
              {lawyer.deskripsi.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">Deskripsi tidak tersedia.</p>
          )}
        </div>

        {/* Bagian Industri */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">Bidang Industri</h2>
          <p className="text-gray-700 text-lg mt-2">
            {lawyer.industri || "Tidak tersedia"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
