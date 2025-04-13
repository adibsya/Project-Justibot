import React, { useRef } from "react";
import { assets } from "../../../assets/assets";
import { motion, useInView } from "framer-motion";

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
          Short heading
        </motion.h2>
        <motion.p
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Getting Started With Justibot: Get your Justice Service
        </motion.p>
        <div className="relative flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="flex flex-col items-center mb-8 lg:mb-0 p-6 rounded-lg shadow-md w-64"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img
              src={assets.feature_lawyer}
              alt="lawyer"
              className="w-[45px] mb-4"
            />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Accessing the Chatbot
            </h5>
            <p className="font-light text-sm text-justify">
              Visit the Justibot website and click on the chatbot icon in the
              bottom right corner. You will be instantly connected with Justibot
              for legal assistance.
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
            <img
              src={assets.feature_lawyer}
              alt="lawyer"
              className="w-[45px] mb-4"
            />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Quick Legal Advice
            </h5>
            <p className="font-light text-sm text-justify">
              Ask your legal questions directly through the chatbot. Justibot
              will provide quick responses based on relevant and up-to-date
              legal information.
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
            <img
              src={assets.feature_lawyer}
              alt="lawyer"
              className="w-[45px] mb-4"
            />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Creating Legal Documents
            </h5>
            <p className="font-light text-sm text-justify">
              Select the document creation feature. Fill out the form with the
              requested information, and Justibot will generate the legal
              document you need.
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
            <img
              src={assets.feature_lawyer}
              alt="lawyer"
              className="w-[45px] mb-4"
            />
            <h5 className="text-lg font-bold tracking-tight mb-2">
              Lawyer Directory
            </h5>
            <p className="font-light text-sm text-justify">
              Browse the directory of lawyers available on the website. You can
              search for lawyers based on their specialization and location to
              get further legal assistance.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Short_heading;
