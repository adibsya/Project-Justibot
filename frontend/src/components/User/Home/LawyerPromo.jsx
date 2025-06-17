import React from "react";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import assets from "../../../assets/assets";

const LawyerPromo = () => {
  return (
    <section className="relative py-14 px-4 sm:px-8 md:px-16 mx-2 sm:mx-8 md:mx-20 rounded-2xl shadow-xl mb-10 border border-gray-100 transition-all duration-300 overflow-hidden bg-gradient-to-br from-secondary/10 via-white to-primary/10">
      {/* Decorative Gradient Circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl z-0"></div>
      <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-primary/10 rounded-full blur-2xl z-0"></div>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Ilustrasi */}
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0 animate-fade-in-up">
          <img
            src={assets.profile}
            alt="Lawyer Illustration"
            className="w-60 h-70 object-contain drop-shadow-2xl rounded-xl border-4 border-secondary/20 hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        {/* Konten */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-800 text-center md:text-left">
            Siap Tingkatkan Karier Anda?{" "}
            <span className="text-secondary drop-shadow-md">Gabung & Raih Lebih Banyak Klien!</span>
          </h2>
          <hr className="w-16 border-t-2 border-secondary mb-4 mx-auto md:mx-0" />
          <p className="mb-6 max-w-xl text-center md:text-left text-gray-600 text-base sm:text-lg">
            Jadilah bagian dari komunitas pengacara profesional kami dan perluas jaringan Anda secara digital.<br />
            <span className="font-medium text-secondary">Sudah punya kantor terdaftar?</span> Daftar sebagai pengacara sekarang juga.<br />
            <span className="font-medium text-secondary">Belum punya kantor?</span> Daftarkan kantor Anda dan mulai membangun reputasi online!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-start">
            <a
              href="/FormPendaftaranLawyer"
              className="flex items-center justify-center gap-2 flex-1 sm:flex-none bg-secondary text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-secondary/80 hover:shadow-xl transition-all duration-200 text-center border-2 border-secondary"
            >
              <FaUserTie className="text-lg" />
              Daftar Sebagai Pengacara
            </a>
            <a
              href="/FormPendaftaranKantor"
              className="flex items-center justify-center gap-2 flex-1 sm:flex-none bg-white border-2 border-secondary text-secondary px-6 py-2 rounded-full hover:scale-105 font-semibold shadow-lg hover:bg-secondary/10 hover:text-secondary transition-all duration-200 text-center"
            >
              <FaBuilding className="text-lg" />
              Daftarkan Kantor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyerPromo;
