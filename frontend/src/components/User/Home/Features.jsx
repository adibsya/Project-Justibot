import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { motion } from "framer-motion";
import { BiBot } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";

const Features = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      id="features-section"
      className="py-36 bg-onPrimary flex flex-col items-center"
    >
      <motion.h2
        className="text-3xl font-bold mb-10 text-onSurface"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        Fitur Justibot
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div
          className="max-w-xs py-5 px-10 bg-surface shadow-lg"
          variants={itemVariants}
        >
          <BiBot className="text-onSurface h-[45px] w-[45px] mb-4" />

          <h5 className="text-lg font-bold tracking-tight text-onSurface mb-2">
            Chatbot Bertenaga AI
          </h5>
          <p className="font-light text-sm text-textSecondary mb-10">
            Dapatkan jawaban instan untuk pertanyaan hukum Anda dengan chatbot
            bertenaga AI kami. Tersedia 24/7 untuk membantu Anda.
          </p>
          <Link to="/chatbot">
            <Button className="bg-secondary text-onPrimary flex items-center">
              Selengkapnya
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
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="max-w-xs py-5 px-10 bg-surface shadow-lg"
          variants={itemVariants}
        >
          <IoDocumentTextOutline className="text-onSurface h-[45px] w-[45px] mb-4" />
          <h5 className="text-lg font-bold tracking-tight text-onSurface mb-2">
            Asisten Dokumen
          </h5>
          <p className="font-light text-sm text-textSecondary mb-10">
            Dapatkan panduan tentang dokumen hukum, kontrak, dan formulir.
            Layanan kami memastikan dokumen Anda terverifikasi.
          </p>
          <Link to="/document">
            <Button className="bg-secondary text-onPrimary flex items-center">
              Selengkapnya
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
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="max-w-xs py-5 px-10 bg-surface shadow-lg"
          variants={itemVariants}
        >
          <FaUserTie className="text-onSurface h-[45px] w-[45px] mb-4" />
          <h5 className="text-lg font-bold tracking-tight text-onSurface mb-2">
            Konsultasi Pengacara
          </h5>
          <p className="font-light text-sm text-textSecondary mb-10">
            Terhubung dengan pengacara yang berkualifikasi untuk mendapatkan
            nasihat dan perwakilan hukum yang dipersonalisasi.
          </p>
          <Link to="/lawyer">
            <Button className="bg-secondary text-onPrimary flex items-center">
              Selengkapnya
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
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Features;
