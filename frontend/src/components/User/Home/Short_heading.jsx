import React, { useRef } from "react";
import { assets } from "../../../assets/assets";
import { motion, useInView } from "framer-motion";
import { BiBot } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Short_heading = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="bg-secondary py-10 text-onPrimary" ref={ref}>
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Alur Penggunaan
        </motion.h2>
        <motion.p
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Memulai Dengan Justibot, Dapatkan Layanan Keadilan Anda
        </motion.p>
        <div className="relative flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="flex flex-col items-center mb-8 lg:mb-0 p-6 rounded-lg shadow-md w-64"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BiBot className="text-onSurface h-[45px] w-[45px] mb-4" />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Akses Chatbot
            </h5>
            <p className="font-light text-sm text-justify">
              Kunjungi situs web Justibot dan klik ikon chatbot di menu
              navigasi. Anda akan langsung terhubung dengan Justibot untuk
              mendapatkan bantuan hukum.
            </p>
          </motion.div>
          <div className="hidden lg:block mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <motion.div
            className="flex flex-col items-center mb-8 lg:mb-0 p-6 rounded-lg shadow-md w-64"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FaBalanceScale
              className="text-onSurface h-[45px] w-[45px] mb-4"
            />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Nasehat Hukum
            </h5>
            <p className="font-light text-sm text-justify">
              Ajukan pertanyaan hukum Anda melalui chatbot. Justibot akan
              memberikan tanggapan cepat berdasarkan informasi hukum yang
              relevan.
            </p>
          </motion.div>
          <div className="hidden lg:block mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <motion.div
            className="flex flex-col items-center mb-8 lg:mb-0 p-6 rounded-lg shadow-md w-64"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <IoDocumentTextOutline className="text-onSurface h-[45px] w-[45px] mb-4" />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Unduh Dokumen Legal
            </h5>
            <p className="font-light text-sm text-justify">
              Pilih fitur unduh dokumen. Unduh formulir dengan informasi yang
              Anda minta, dan Justibot akan menyediakan dokumen hukum yang Anda
              butuhkan.
            </p>
          </motion.div>
          <div className="hidden lg:block mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
          <motion.div
            className="flex flex-col items-center mb-8 lg:mb-0 p-6 rounded-lg shadow-md w-64"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <FaUserTie className="text-onSurface h-[45px] w-[45px] mb-4" />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Direktori Pengacara
            </h5>
            <p className="font-light text-sm text-justify">
              Jelajahi direktori pengacara yang tersedia di navigasi untuk
              mendapatkan bantuan hukum lebih lanjut berdasarkan spesialisasi
              mereka.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Short_heading;
