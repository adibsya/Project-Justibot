import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

const Iklan = () => {
  return (
    <div className="bg-secondary relative w-full min-h-[600px] md:min-h-[800px] lg:min-h-[600px] pb-4 overflow-hidden text-onSurface">
      <img
        src={assets.section2}
        alt="Iklan"
        className="w-full h-full object-cover absolute inset-0"
      />

      <motion.div
        className="relative z-10 flex flex-col items-center pt-8 md:pt-12 lg:pt-16 px-4"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Temukan Pengacara Terbaik untuk Masalah Hukum Anda
        </h2>
        <p className="leading-relaxed text-white text-center mt-4 md:mt-6 lg:mt-[50px] w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-[900px] tracking-wide text-sm md:text-base">
          Butuh bantuan hukum? Cari dan hubungi pengacara berpengalaman di
          direktori kami. Dapatkan informasi lengkap, spesialisasi, dan ulasan
          pengguna untuk memilih pengacara yang tepat. Mulai konsultasi sekarang
          dan temukan solusi hukum yang Anda butuhkan!
        </p>
      </motion.div>

      <div className="relative z-10 mt-8 md:mt-12 lg:mt-16 px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          // initial={{ y: 50, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          // viewport={{ once: false, amount: 0.2 }}
          // transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          {[
            {
              img: assets.verifikasi,
              title: "Informasi Terverifikasi",
              desc: "Semua pengacara di direktori kami telah diverifikasi, sehingga Anda bisa memilih dengan aman dan percaya diri.",
            },
            {
              img: assets.praktis,
              title: "Praktis & Cepat",
              desc: "Akses direktori kapan saja dan hubungi pengacara secara langsung tanpa repot.",
            },
            {
              img: assets.aman,
              title: "Aman & Terpercaya",
              desc: "Privasi Anda terjamin, dan semua pengacara terdaftar memiliki kredibilitas yang dapat dipercaya.",
            },
            {
              img: assets.kebutuhan,
              title: "Cari Sesuai Kebutuhan",
              desc: "Temukan pengacara berdasarkan spesialisasi hukum yang Anda butuhkan, lengkap dengan ulasan pengguna.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
              // initial={{ y: 30, opacity: 0 }}
              // whileInView={{ y: 0, opacity: 1 }}
              // viewport={{ once: false, amount: 0.2 }}
              // transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 * index }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-[45px] md:w-[55px] mb-4 md:mb-6"
              />
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Iklan;
