import React from "react";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const Home_AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-onPrimary py-10 md:py-16 relative overflow-hidden">
      {/* Half rounded box with secondary color */}
      <div className="absolute top-0 h-full w-full bg-primary rounded-b-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="w-full md:w-1/2 space-y-4 text-justify">
            <h2 className="text-2xl md:text-3xl font-bold text-onSurface mb-4">
              Tentang Justibot
            </h2>
            <p className="text-onSurface mb-4">
              Justibot adalah asisten hukum bertenaga AI inovatif yang dirancang
              untuk membuat informasi dan layanan hukum dapat diakses oleh semua
              orang. Platform kami menggabungkan teknologi canggih dengan
              keahlian hukum untuk memberikan panduan yang dapat diandalkan
              dalam berbagai masalah hukum.
            </p>
            <p className="text-onSurface">
              Apakah Anda memerlukan bantuan untuk memahami dokumen hukum,
              panduan tentang prosedur hukum, atau koneksi ke pengacara yang
              memenuhi syarat, Justibot ada di sini untuk menyederhanakan
              perjalanan hukum Anda.
            </p>
            <button
              className="flex items-center hover:text-onSurface/90 text-onSurface py-2"
              onClick={() => navigate(`../about`)}
            >
              Lihat Selengkapnya
              <svg
                className="ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <img
              src={assets.home_aboutus}
              alt="About Justibot"
              className="max-w-full md:max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_AboutUs;
