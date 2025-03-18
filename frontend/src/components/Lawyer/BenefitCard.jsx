import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const BenefitCard = () => {
  const lawyers = [
    {
      name: "John Doe",
      specialty: "Specialized in Corporate Law with 10 years of experience",
      link: "/profile/john-doe",
    },
    {
      name: "Jane Smith",
      specialty: "Expert in Family Law with 8 years of experience",
      link: "/profile/jane-smith",
    },
    {
      name: "Mike Johnson",
      specialty: "Criminal Law specialist with 12 years of experience",
      link: "/profile/mike-johnson",
    },
  ];

  return (
    <div className="w-full bg-[#775F4E] py-20 px-4">
      <motion.div
        className="text-white text-4xl md:text-5xl font-bold text-center"
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Top Lawyers
      </motion.div>

      {/* Cards Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
        {lawyers.map((lawyer, index) => (
          <div
            key={index}
            className="relative group bg-primary bg-gradient-to-t from-black/90 to-transparent rounded-lg p-4 shadow-lg w-64"
          >
            <img
              src={assets.lawyer}
              alt={lawyer.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg md:text-xl font-bold mb-2">
                {lawyer.name}
              </h3>
              <p className="text-sm text-center mb-4">{lawyer.specialty}</p>
              <a
                href={lawyer.link}
                className="bg-primary px-4 py-2 rounded-lg hover:bg-opacity-90"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <motion.div
        className="text-white text-center mt-12 px-4 max-w-3xl mx-auto"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Pilih dari deretan pengacara berpengalaman dengan rating tertinggi dan
        ulasan terbaik. Dapatkan bantuan hukum profesional yang Anda butuhkan
        sekarang!
      </motion.div>
    </div>
  );
};

export default BenefitCard;
