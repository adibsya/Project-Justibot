import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-24 pb-16 text-onSurface"> 
      <div className="max-w-5xl w-full mx-auto p-12 bg-white shadow-lg rounded-lg mt-6 space-y-10">
        
        {/* Bagian Profile */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Gambar Profil */}
          <img
            src={assets.profile}  // Pastikan file ada di public/images/
            alt="Profile Picture"
            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md"
          />

          {/* Informasi Profil */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Nur Rohma Widiya Ningsih, S.T.</h1>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <MapPin size={20} /> Gedangan
            </div>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <Briefcase size={20} /> 4 year experience
            </div>
            <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
              <GraduationCap size={20} /> UPN Veteran Jatim
            </div>

            {/* Tombol Konsultasi */}
            <button className="mt-6 px-6 py-3 bg-gray-500 text-white text-lg rounded shadow-md hover:bg-gray-600">
              Konsultasi
            </button>
          </div>
        </div>

        {/* Bagian Expertise */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">Expertise and Specialization</h2>
          <p className="text-gray-700 text-lg mt-2">
            Business Law, Commercial Loan Law, Labor Law
          </p>
        </div>

        {/* Bagian About */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">About Lawyer</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2 mt-2">
            <li>Terms of Trade, especially Export - Import</li>
            <li>Legal Due Diligence</li>
            <li>Trade Contract Cooperation</li>
            <li>Investment</li>
            <li>Business Licenses</li>
            <li>Property and Mining</li>
          </ul>
        </div>

        {/* Bagian Industries */}
        <div className="border-t pt-6">
          <h2 className="text-3xl font-semibold">Industries</h2>
          <p className="text-gray-700 text-lg mt-2">Trading, Finance</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
