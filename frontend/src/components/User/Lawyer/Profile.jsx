import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../../assets/assets";

const Profile = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/lawyers/${id}`);
        if (!response.ok) {
          throw new Error("Pengacara tidak ditemukan");
        }
        const data = await response.json();
        setLawyer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

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
              <Briefcase size={20} /> {lawyer.pengalaman_tahun || 0} tahun pengalaman
            </div>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <GraduationCap size={20} /> {lawyer.asal_univ || "Tidak tersedia"}
            </div>

            {/* Tombol Konsultasi */}
            <button className="mt-6 px-6 py-3 bg-gray-500 text-white text-lg rounded shadow-md hover:bg-gray-600">
              Konsultasi
            </button>
          </div>
        </div>

        {/* Bagian Keahlian */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">Expertise and Specialization</h2>
          <p className="text-gray-700 text-lg mt-2">
            {lawyer.spesialisasi || "Tidak tersedia"}
          </p>
        </div>

        {/* Bagian About */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">About Lawyer</h2>
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
          <h2 className="text-3xl font-semibold">Industries</h2>
          <p className="text-gray-700 text-lg mt-2">
            {lawyer.industri || "Tidak tersedia"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
