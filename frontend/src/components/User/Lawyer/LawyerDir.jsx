import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../../assets/assets";

const LawyerDir = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center px-6 sm:px-12 md:px-24 gap-12 pt-[100px]">
      <motion.div
        className="relative w-full max-w-md md:max-w-[650px] h-auto flex justify-center md:justify-end order-1 md:order-2"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={assets.actor}
          alt="Actor"
          className="w-[85%] sm:w-[90%] md:w-[500px] lg:w-[750px] xl:w-[850px] min-w-[300px] max-w-full h-auto"
        />
      </motion.div>

      <motion.div
        className="max-w-[650px] text-center md:text-left order-2 md:order-1"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-onSurface">
          Direktori Pengacara
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-onSurface/60 leading-relaxed text-justify">
          Direktori Pengacara membantu pengguna menemukan dan menghubungi
          pengacara profesional sesuai dengan bidang keahlian mereka. Dengan
          fitur pencarian yang mudah, pengguna dapat mencari pengacara
          berdasarkan spesialisasi, lokasi, atau kebutuhan hukum tertentu untuk
          mendapatkan bantuan yang tepat dan terpercaya.
        </p>
      </motion.div>
    </div>
  );
};

export default LawyerDir;
