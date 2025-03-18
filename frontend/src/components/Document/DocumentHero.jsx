import React from "react";
import { assets } from "../../assets/assets";

const DocumentHero = () => {
  return (
    <div className="bg-onPrimary py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-2 mb-8 text-onSurface">
          Daftar Dokumen
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left text content */}
          <div className="w-full md:w-1/3 space-y-4 text-left mt-8 md:mt-40">
            <p className="text-xl md:text-3xl font-semibold text-textPrimary">
              Dokumen hukum bisa untuk berbagai keperluan!
            </p>
          </div>

          {/* Center image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={assets.direktori_dokumen}
              alt="Dokumen Hukum"
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Right text content */}
          <div className="w-full md:w-1/3 space-y-4 text-right flex flex-col justify-end mt-8 md:mt-0">
            <p className="text-onSurface">
              Mulai dari perjanjian kontrak, surat kuasa, hingga dokumen bisnis,
              semua bisa Anda buat dengan mudah di Justibot. Cepat, aman, dan
              sah secara hukum!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHero;
